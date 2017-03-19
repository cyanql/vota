import * as types from './types'
import router from 'src/router'
import DateLib from 'src/lib/DateLib'
import { API, ITEM_MAP, HERO_MAP, HEROS, ITEMS, RUNE_MAP } from 'src/constants'
import { percentify, polling, localData } from 'src/util'

// 装载本地数据
export function loadLocalData({commit}) {
	if (process.env.NODE_ENV === 'development') {
		commit(types.GET_USERS_FETCH_SUCCESS, require('src/../.data/players.json'))
		commit(types.GET_MATCHES_FETCH_SUCCESS, handleMatches(require('src/../.data/matches.json')))
		const match = require('src/../.data/match.detail.json')
		match.logs = getLogs(match)
		commit(types.GET_MATCH_FETCH_SUCCESS, handleMatch(match))
	}
	const data = {}
	data.users = localData.get('users') || []
	commit(types.LOAD_LOCALSTORAGE, data)
}

export function removeLocalData({commit}, key) {
	localData.remove(key)
	window.confirm('确认是否清空历史记录') && commit(types.LOAD_LOCALSTORAGE, {users: []})
}

// status
export function changeUserName({commit}, val) {
	commit(types.CHANGE_USER_NAME, val)
}

// users
export function getUsersFetch({commit}, name) {
	API.fetch(API.search, {query: {q: name}})
	.then(res => res.json())
	.then(users => {
		commit(types.GET_USERS_FETCH_SUCCESS, users)
	})
}

// match
export function getMatchesFetch({commit, state}, user) {
	// const userid = state.users[state.status.selectUserIndex].account_id
	API.fetch(API.players.matches, {param: user.account_id})
	.then(res => res.json())
	.then(matches => {
		commit(types.GET_MATCHES_FETCH_SUCCESS, handleMatches(matches))
		router.push('/userinfo')
		localData.update('users', users => users ? users.every(v => v.account_id !== user.account_id) ? users.push(user) : users : [user])
	})
}

export function getMatchFetch({commit, dispatch}, matchid) {
	API.fetch(API.matches, {param: matchid})
	.then(res => res.json())
	.then(match => {
		try {
			match.logs = getLogs(match)
		} catch(e) {
			const result = window.confirm('尚无完整比赛信息，是否解析？')
			if (result) {
				return API.fetch(API.request.job, {param: matchid, method: 'post'})
					.then(res => res.json())
					.then(json => {
						if (json.state === 'failed') {
							return alert('解析失败')
						}
						polling((done) => {
							API.fetch(API.request.match, {param: json.job.jobId})
								.then(res => res.json())
								.then(json => {
									if (json.state === 'active') {
										console.log(json.progress)
									} else if (json.state === 'completed') {
										dispatch('getMatchFetch', matchid)
										done()
									} else {
										alert('解析失败')
										done()
									}
								})
						}, 3000)
					})
			} else {
				match.logs = []
			}
		}
		match = handleMatch(match)
		commit(types.GET_MATCH_FETCH_SUCCESS, match)
		router.push('/match/summary')
	})
}

// handlers
function handleMatches(matches) {
	return matches.map(match => {
		match.hero_img = API.IMG_HOST + HERO_MAP[match.hero_id].img
		match.win = match.player_slot < 5 ? match.radiant_win : !match.radiant_win
		match.from_now = DateLib.fromNow(new Date(match.start_time * 1000))
		return match
	})
}

function handleMatch(match) {
	match.from_now = DateLib.fromNow(new Date(match.start_time * 1000))
	match.duration = DateLib.duration(match.duration)
	match.players.forEach(v => {
		v.hero_img = API.HOST + HERO_MAP[v.hero_id].img
		v.item_0 = API.HOST + (ITEM_MAP[v.item_0] || {}).img
		v.item_1 = API.HOST + (ITEM_MAP[v.item_1] || {}).img
		v.item_2 = API.HOST + (ITEM_MAP[v.item_2] || {}).img
		v.item_3 = API.HOST + (ITEM_MAP[v.item_3] || {}).img
		v.item_4 = API.HOST + (ITEM_MAP[v.item_4] || {}).img
		v.item_5 = API.HOST + (ITEM_MAP[v.item_5] || {}).img
	})

	match.radiant_players = []
	match.dire_players = []
	match.players.forEach(v => {
		if (v.isRadiant) {
			v.fight_ratio = percentify((v.assists + v.kills) / match.radiant_score)
			match.radiant_players.push(v)
		} else {
			v.fight_ratio = percentify((v.assists + v.kills) / match.dire_score)
			match.dire_players.push(v)
		}
	})
	match.radiant_damage = match.radiant_players.reduce((p, v) => p + v.hero_damage, 0)
	match.dire_damage = match.dire_players.reduce((p, v) => p + v.hero_damage, 0)
	match.radiant_players.forEach(v => {
		v.demage_per = percentify(v.hero_damage / match.radiant_damage)
	})
	match.dire_players.forEach(v => {
		v.demage_per = percentify(v.hero_damage / match.dire_damage)
	})
	return match
}

function getLogs(match) {
	let logs = [], player_imgs = []
	// match.objectives.forEach(v => {
	// 	v.isRadiant = v.player_slot < 5
	// 	v.incident = zh_CN[v.type]
	// 	logs.push(v)
	// })
	match.players.forEach(v => {
		const hero_img = API.HOST + HERO_MAP[v.hero_id].img
		const isRadiant = v.isRadiant

		player_imgs.push(hero_img)

		v.kills_log.forEach(w => {
			logs.push({
				type: 'kill',
				kills_hero_img: API.IMG_HOST + HEROS[w.key].img,
				time: w.time,
				hero_img,
				isRadiant
			})
		})
		v.purchase_log.forEach(w => {
			logs.push({
				type: 'purchase',
				item_img: API.IMG_HOST + ITEMS[w.key].img,
				time: w.time,
				hero_img,
				isRadiant
			})
		})
		v.runes_log.forEach(w => {
			logs.push({
				type: 'rune',
				rune_img: RUNE_MAP[w.key].img,
				time: w.time,
				hero_img,
				isRadiant
			})
		})
	})
	match.teamfights.forEach(v => {
		let total_damage = 0, players
		players = v.players.map((w, index) => {
			w.hero_img = player_imgs[index]
			return w
		})
		players = players.map(v => {
			v.class = {
				death: !!v.deaths
			}
			v.abilitys = Object.keys(v.ability_uses).map(key => {
				return {
					name: key,
					times: v.ability_uses[key],
					img: API.IMG_HOST + '/apps/dota2/images/abilities/' + key + '_sm.png'
				}
			})
			v.items = Object.keys(v.item_uses).map(key => {
				return {
					name: key,
					times: v.item_uses[key],
					img: API.IMG_HOST + ITEMS[key].img
				}
			})
			total_damage += v.damage
			return v
		})
		players = players.map(v => {
			v.damage_percent = (v.damage / total_damage * 100) + '%'
			return v
		})
		logs.push({
			type: 'teamfight',
			start: DateLib.duration(v.start),
			end: DateLib.duration(v.end),
			time: v.start,
			radiant_players: players.slice(0, 5),
			dire_players: players.slice(5),
		})
	})
	logs = logs
	.sort((p, n) => p.time < n.time ? -1 : p.time > n.time ? 1 : 0)
	.map(v => {
		v.time = v.time > 0 ? DateLib.duration(v.time) : '-' + DateLib.duration(Math.abs(v.time))
		return v
	})
	return logs
}
