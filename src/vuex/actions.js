import * as types from './types'
import router from 'src/router'
import DateLib from 'src/lib/DateLib'
import { ITEM_MAP, HERO_MAP, RUNE_MAP } from 'src/constant/image'
import API from 'src/constant/api'
import { percentify, polling, localData, parsePositions } from 'src/util'


export function auth({commit}) {
	commit(types.AUTH)
}


// 装载本地数据
export function loadLocalData({commit, state}) {
	if (state.status.dev) {
		commit(types.GET_USERS_FETCH_SUCCESS, require('src/../.data/players.json'))
		commit(types.GET_MATCHES_FETCH_SUCCESS, handleMatches(require('src/../.data/matches.json')))
		const match = require('src/../.data/match.detail.json')
		match.logs = parseLogs(match)
		match.visions = parseVisions(match)
		commit(types.GET_MATCH_FETCH_SUCCESS, handleMatch(match))
	}
	const data = {}
	data.users = localData.get('users') || []
    data.user = localData.get('user')
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
export async function getUsersFetch({commit, dispatch}, name) {
	if (/\d+/.test(name)) {
		const user = await API.fetch(API.players._, {param: name})
		dispatch('getMatchesFetch', user.profile)
	} else {
		const users = await API.fetch(API.search, {query: {q: name, similarity: .75}})
		commit(types.GET_USERS_FETCH_SUCCESS, users)
	}
}

export async function getOffsetMatchesFetch({commit, state}, offset) {
    const user = state.status.history.user
    const matches = await API.fetch(API.players.matches, {param: user.account_id, query: {limit: 20, offset}})
    commit(types.GET_OFFSET_MATCHES_FETCH_SUCCESS, handleMatches(matches))
}

// match
export async function getMatchesFetch({commit, state}, user) {
	// const userid = state.users[state.status.selectUserIndex].account_id
	const matches = await API.fetch(API.players.matches, {param: user.account_id, query: {limit: 20}})
    commit(types.GET_MATCHES_FETCH_SUCCESS, handleMatches(matches))
    commit(types.SELECT_USER, user)
	router.push('/userinfo')
    localData.update('user', () => user)
	localData.update('users', users => {
		if (users) {
			users.every(v => v.account_id !== user.account_id) && users.push(user)
			return users
		} else {
			return [user]
		}
	})
}

export async function getMatchFetch({commit, dispatch}, matchid) {
	const matchDetails = localData.get('matchDetails')
	let match, logs, visions

	if (matchDetails) {
		match = matchDetails[matchid]
	}

	if (!match) {
		match = await API.fetch(API.matches, {param: matchid})
	}

	try {
		logs = parseLogs(match)
		visions = parseVisions(match)
		// isDetail
		if (logs && visions) {
			localData.update('matchDetails', (v) => ({
				...v,
				matchid: match
			}))
		}
		match.logs = logs
		match.visions = visions
	} catch(e) {
		const result = window.confirm('尚无完整比赛信息，是否解析？\n（过程需要几分钟，请耐心等候...）')
		if (result) {
			return dispatch('getMatchDetailFetch', matchid)
		} else {
			match.logs = []
			match.visions = []
		}
	}
	match = handleMatch(match)
	commit(types.GET_MATCH_FETCH_SUCCESS, match)
	router.push('/match/summary')
}

export async function getMatchDetailFetch({dispatch}, matchid) {
	let json = API.fetch(API.request.job, {param: matchid, method: 'post'})

	if (json.state === 'failed') {
		return alert('解析失败')
	}

	polling(async (done) => {
		json = await API.fetch(API.request.match, {param: json.job.jobId})
		if (json.state === 'active') {
			console.log(json.progress)
		} else if (json.state === 'completed') {
			done()
			dispatch('getMatchFetch', matchid)
		} else {
			done()
			alert('解析失败')
		}
	}, 3000)
}

// handlers
function handleMatches(matches) {
	return matches.map(match => ({
		...match,
		heroImage: HERO_MAP.ID_MAP[match.hero_id].img,
		win: match.player_slot < 5 ? match.radiant_win : !match.radiant_win,
		from_now: DateLib.fromNow(new Date(match.start_time * 1000)),
		parsed: !!match.version,
	}))
}

function handleMatch(match) {
	// 距离现在
	match.from_now = DateLib.fromNow(new Date(match.start_time * 1000))
	// 持续时间
	match.duration = DateLib.duration(match.duration)
	// 补充img前缀
	match.players.forEach(v => {
		v.heroImage = HERO_MAP.ID_MAP[v.hero_id].img
		v.item_0 = (ITEM_MAP.ID_MAP[v.item_0] || {}).img
		v.item_1 = (ITEM_MAP.ID_MAP[v.item_1] || {}).img
		v.item_2 = (ITEM_MAP.ID_MAP[v.item_2] || {}).img
		v.item_3 = (ITEM_MAP.ID_MAP[v.item_3] || {}).img
		v.item_4 = (ITEM_MAP.ID_MAP[v.item_4] || {}).img
		v.item_5 = (ITEM_MAP.ID_MAP[v.item_5] || {}).img
	})
	// 参战率
	match.radiantPlayers = []
	match.direPlayers = []
	match.players.forEach(v => {
		if (v.isRadiant) {
			v.fight_ratio = percentify((v.assists + v.kills) / match.radiant_score)
			match.radiantPlayers.push(v)
		} else {
			v.fight_ratio = percentify((v.assists + v.kills) / match.dire_score)
			match.direPlayers.push(v)
		}
	})
	// 伤害比
	match.radiant_damage = match.radiantPlayers.reduce((p, v) => p + v.hero_damage, 0)
	match.dire_damage = match.direPlayers.reduce((p, v) => p + v.hero_damage, 0)
	match.radiantPlayers.forEach(v => {
		v.damagePercent = percentify(v.hero_damage / match.radiant_damage)
	})
	match.direPlayers.forEach(v => {
		v.damagePercent = percentify(v.hero_damage / match.dire_damage)
	})
	return match
}

function parseVisions(match) {
	const visions = []
	match.players.forEach(v => {
		v.sen_log.forEach(w => {
			visions.push({
				type: 'sen',
				time: w.time,
				isRadiant: w.player_slot < 127,
				x: w.x,
				y: w.y
			})
		})
		v.obs_log.forEach(w => {
			visions.push({
				type: 'obs',
				time: w.time,
				isRadiant: w.player_slot < 127,
				x: w.x,
				y: w.y
			})
		})
	})
	return visions
		.sort((p, n) => p.time < n.time ? -1 : p.time > n.time ? 1 : 0)
		.map(v => ({
			...v,
			time: v.time > 0 ? DateLib.duration(v.time) : '-' + DateLib.duration(Math.abs(v.time))
		}))
}

function parseLogs(match) {
	const logs = [], playerImageSet = []
	// match.objectives.forEach(v => {
	// 	v.isRadiant = v.player_slot < 5
	// 	v.incident = zh_CN[v.type]
	// 	logs.push(v)
	// })

	match.players.forEach(v => {
		const heroImage = HERO_MAP.ID_MAP[v.hero_id].img
		const heroIcon = HERO_MAP.ID_MAP[v.hero_id].icon
		const isRadiant = v.isRadiant
		// 头像地址
		playerImageSet.push({
			heroImage,
			heroIcon
		})
		// 击杀记录
		v.kills_log.forEach(w => {
			logs.push({
				type: 'kill',
				killsHeroImage: HERO_MAP.NAME_MAP[w.key].img,
				time: w.time,
				heroImage,
				isRadiant
			})
		})
		// 采购记录
		v.purchase_log.forEach(w => {
			logs.push({
				type: 'purchase',
				itemImage: ITEM_MAP.NAME_MAP[w.key].img,
				time: w.time,
				cost: ITEM_MAP.NAME_MAP[w.key].cost,
				heroImage,
				isRadiant
			})
		})
		// 神符记录
		v.runes_log.forEach(w => {
			logs.push({
				type: 'rune',
				runeImage: RUNE_MAP.ID_MAP[w.key].img,
				time: w.time,
				heroImage,
				isRadiant
			})
		})
		// 热点位置
		v.lane_positions = parsePositions(v.lane_pos)
	})

	// 团战记录
	match.teamfights.forEach(v => {
		let totalDamage = 0
		,	totalGold = 0
		,	totalXp = 0
		,	players = v.players

		players = players.map((w, index) => ({
			...w,
			heroImage: playerImageSet[index].heroImage,
			heroIcon: playerImageSet[index].heroIcon
		}))

		players = players.map(w => {
			// 技能使用
			const abilities = Object.keys(w.ability_uses).map(key => ({
				name: key,
				times: w.ability_uses[key],
				img: [API.IMG_HOST, '/apps/dota2/images/abilities/', key, '_sm.png'].join('')
			}))
			// 物品使用
			const items = Object.keys(w.item_uses).map(key => ({
				name: key,
				times: w.item_uses[key],
				img: ITEM_MAP.NAME_MAP[key].img
			}))
			// 伤害、经验、经济 总量
			totalDamage += w.damage
			totalXp += w.xp_delta
			totalGold += Math.abs(w.gold_delta)
			return {
				...w,
				abilities,
				items
			}
		})
		// 伤害、经验、经济 比例
		players = players.map(w => ({
			...w,
			damagePercent: percentify(w.damage / totalDamage),
			xpPercent: percentify(w.xp_delta / totalXp),
			goldPercent: percentify(Math.abs(w.gold_delta / totalGold)),
			positions: parsePositions(w.deaths_pos),
		}))

		logs.push({
			type: 'teamfight',
			start: DateLib.duration(v.start),
			end: DateLib.duration(v.end),
			time: v.start,
			radiantPlayers: players.slice(0, 5),
			direPlayers: players.slice(5),
			players: players,
			map_img: API.MAP
		})
	})

	return logs
		.sort((p, n) => p.time < n.time ? -1 : p.time > n.time ? 1 : 0)
		.map(v => ({
			...v,
			time: v.time > 0 ? DateLib.duration(v.time) : '-' + DateLib.duration(Math.abs(v.time))
		}))
}
