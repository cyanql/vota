import * as types from './types'
import router from 'src/router'
import DateLib from 'src/lib/DateLib'
import { ITEM_MAP, HERO_MAP, RUNE_MAP } from 'src/constant/image'
import API from 'src/constant/api'
import { zh_CN } from 'src/constant/lang'
import M from 'src/component/modal'
import { percentify, polling, cache, parsePositions } from 'src/util'

global.cache = cache

const { fromNow, duration } = DateLib

export function auth({commit}) {
	commit(types.AUTH)
}
export function backup({commit}) {
    commit(types.BACKUP)
}

export function restore({commit}) {
    commit(types.RESTORE)
}

// 装载本地数据
export function loadLocalData({commit, state}) {
	if (state.status.dev) {
		commit(types.SEARCH_USERS_FETCH_SUCCESS, require('src/../.data/players.json'))
		commit(types.GET_MATCHES_FETCH_SUCCESS, handleMatches(require('src/../.data/matches.json')))
		const match = require('src/../.data/match.detail.json')
		commit(types.GET_MATCH_FETCH_SUCCESS, parseMatch(handleMatch(match)))
	}
	const history = {}
	history.users = cache.get('users') || []
    history.user = cache.get('user')
	commit(types.LOAD_LOCALSTORAGE, history)
}

export function removeLocalData({commit}, key) {
	cache.remove(key)
	window.confirm('确认是否清空历史记录') && commit(types.LOAD_LOCALSTORAGE, {users: []})
}

// status
export function changeUserName({commit}, val) {
	commit(types.CHANGE_USER_NAME, val)
}

// users
export async function searchUsersFetch({commit, dispatch}, username) {
	const userBriefProfiles = await API.fetch(API.search, {query: {q: username, similarity: .75}})
	commit(types.SEARCH_USERS_FETCH_SUCCESS, userBriefProfiles)
}

export async function getUserFetch({commit, dispatch}, userid) {
	const user = await API.fetch(API.players._, {param: userid})
    if (!user.profile) {
        alert('用户不存在')
        throw new Error('用户不存在')
    }
    // add win & lose to user
    const wl = await API.fetch(API.players.wl, {param: userid})
    const newUser = Object.assign({}, user, wl)
    newUser.totalGames = newUser.win + newUser.lose
    newUser.winPercent = percentify(newUser.win / newUser.totalGames)

    commit(types.SET_CURRENT_USER, newUser)

    cache.update('user', () => user)
    cache.update('users', users => {
        if (Array.isArray(users)) {
            users.every(v => v.profile.account_id !== user.profile.account_id) && users.push(user)
            return users
        } else {
            return [user]
        }
    })
}

const matchQuery = {
    limit: 20,
    project: [
        'hero_id',
        'start_time',
        'duration',
        // 'player_slot',
        'radiant_win',
        'game_mode',
        // 'lobby_type',
        'version',
        'kills',
        'deaths',
        'assists',
        'skill',
        // 'xp_per_min',
        // 'gold_per_min',
        // 'hero_damage',
        // 'tower_damage',
        // 'hero_healing',
        // 'last_hits'
    ]
}

export async function getOtherUserMatchesFetch({commit, dispatch}, userid) {
	const matches = await API.fetch(API.players.matches, {param: userid, query: matchQuery})
    dispatch('backup')
    commit(types.GET_MATCHES_FETCH_SUCCESS, handleMatches(matches))
}

// match
export async function getMatchesFetch({commit, dispatch}, userid) {
	const matches = await API.fetch(API.players.matches, {param: userid, query: matchQuery})
    commit(types.GET_MATCHES_FETCH_SUCCESS, handleMatches(matches))
}

export async function getOffsetMatchesFetch({commit, state}, offset) {
    const user = state.status.history.user
    const matches = await API.fetch(API.players.matches, {param: user.profile.account_id, query: {...matchQuery, offset}})
    commit(types.GET_OFFSET_MATCHES_FETCH_SUCCESS, handleMatches(matches))
}

export async function getMatchFetch({commit, dispatch}, matchid) {
	const matchDetails = cache.get('matchDetails')
	let match, parsedMatch

	if (matchDetails) {
		match = matchDetails[matchid]
	}

	if (!match) {
        M.spin(true)
		match = await API.fetch(API.matches, {param: matchid})
	}

	try {
        parsedMatch = parseMatch(match)
		// isDetail
		cache.update('matchDetails', (v) => ({
			...v,
			[matchid]: match
		}))
	} catch(e) {
		const result = window.confirm('尚无完整比赛信息，是否解析？\n（过程需要几分钟，请耐心等候...）')
		if (result) {
			return dispatch('getMatchDetailFetch', matchid)
		} else {
            parsedMatch = match
            parsedMatch.visions = []
            parsedMatch.heats = []
            parsedMatch.logs = []
		}
	}
	match = parsedMatch ? handleMatch(parsedMatch) : handleMatch(match)
	commit(types.GET_MATCH_FETCH_SUCCESS, match)
	router.push('/match/summary')
    M.spin(false)
}

export async function getMatchDetailFetch({dispatch}, matchid) {
	const data = await API.fetch(API.request.job, {param: matchid, method: 'post'})

	if (data.state === 'failed') {
		return alert('解析失败')
	}

	polling(async (done) => {
		const json = await API.fetch(API.request.match, {param: data.job.jobId})
		if (json.state === 'active') {
            M.progress(json.progress)
		} else if (json.state === 'completed') {
			done()
			dispatch('getMatchFetch', matchid)
            M.progress(true)
		} else {
			done()
            M.progress(false)
		}
	}, 3000)
}

// handlers
function handleMatches(matches) {
    const { gameMode, skill } = zh_CN
	return matches.map(match => ({
		...match,
		heroImage: HERO_MAP.ID_MAP[match.hero_id].img,
		win: match.player_slot < 5 ? match.radiant_win : !match.radiant_win,
		fromNow: fromNow(new Date(match.start_time * 1000)),
		parsed: !!match.version,
        gameMode: gameMode[match.game_mode],
        skillLevel: skill[match.skill]
	}))
}

function handleMatch(match) {
    match = Object.assign({}, match)
	// 距离现在
	match.fromNow = fromNow(new Date(match.start_time * 1000))
	// 持续时间
	match.duration = duration(match.duration)
    // 等级
    match.skillLevel = zh_CN.skill[match.skill]
    // 模式
    match.gameMode = zh_CN.gameMode[match.game_mode]
	// 补充img前缀
	match.players = match.players.map(v => ({
        ...v,
		heroImage: HERO_MAP.ID_MAP[v.hero_id].img,
		item_0: (ITEM_MAP.ID_MAP[v.item_0] || {}).img,
		item_1: (ITEM_MAP.ID_MAP[v.item_1] || {}).img,
		item_2: (ITEM_MAP.ID_MAP[v.item_2] || {}).img,
		item_3: (ITEM_MAP.ID_MAP[v.item_3] || {}).img,
		item_4: (ITEM_MAP.ID_MAP[v.item_4] || {}).img,
		item_5: (ITEM_MAP.ID_MAP[v.item_5] || {}).img,
	}))
	// 参战率
	match.radiantPlayers = match.players.slice(0, 5)
	match.direPlayers = match.players.slice(5)
	// 伤害比
	const radiantDamage = match.radiantPlayers.reduce((p, v) => p + v.hero_damage, 0)
	const direDamage = match.direPlayers.reduce((p, v) => p + v.hero_damage, 0)

	match.radiantPlayers = match.radiantPlayers.map(v => ({
        ...v,
        fightPercent: percentify((v.assists + v.kills) / match.radiant_score),
		damagePercent: percentify(v.hero_damage / radiantDamage),
	}))
	match.direPlayers = match.direPlayers.map(v => ({
        ...v,
        fightPercent: percentify((v.assists + v.kills) / match.dire_score),
		damagePercent: percentify(v.hero_damage / direDamage),
	}))
	return match
}

function parseMatch(match) {
    match = Object.assign({}, match)
    match.logs = parseLogs(match)
    match.visions = parseVisions(match)
    match.heats = parseHeats(match)
    return match
}

function parseHeats(match) {
    const heats = []
    const proportion = document.body.offsetWidth / 128
	match.players.forEach(v => {
        const positions = parsePositions(v.lane_pos).map(v => ({
            x: Math.round(v.x * proportion),
            y: Math.round(v.y * proportion),
            value: v.value + 15
        }))
		// 热点位置
		heats.push({
            heroImage: HERO_MAP.ID_MAP[v.hero_id].img,
            positions,
            max: Math.max.apply(null, positions.map(v => v.value)),
            min: 0
        })
	})
    return heats
}

function parseVisions(match) {
    const visions = []
    const senWidth = document.body.offsetWidth / 12
    const obsWidth = senWidth * 1600 / 850
	match.players.forEach(v => {
		v.sen_log.forEach(w => {
			visions.push({
				type: 'sen',
				time: w.time,
				isRadiant: w.player_slot < 127,
				x: w.x,
				y: w.y,
                width: senWidth
			})
		})
		v.obs_log.forEach(w => {
			visions.push({
				type: 'obs',
				time: w.time,
				isRadiant: w.player_slot < 127,
				x: w.x,
				y: w.y,
                width: obsWidth
			})
		})
	})
    const scale = document.body.offsetWidth / 128
	return visions
		.sort((p, n) => p.time < n.time ? -1 : p.time > n.time ? 1 : 0)
		.map(v => ({
			...v,
            x: (v.x - 64) * scale - 25 + 'px',
            y: (128 + 64 - v.y) * scale - 25 + 'px',
			moment: v.time > 0 ? duration(v.time) : '-' + duration(Math.abs(v.time))
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
        const proportion = .5 ** .5
		// 伤害、经验、经济 比例
		players = players.map(w => ({
			...w,
			damagePercent: percentify(w.damage / totalDamage),
			xpPercent: percentify(w.xp_delta / totalXp),
			goldPercent: percentify(Math.abs(w.gold_delta / totalGold)),
			positions: parsePositions(w.deaths_pos).map(v => ({
                ...v,
                x: v.x * proportion,
                y: v.y * proportion
            })),
		}))

		logs.push({
			type: 'teamfight',
			start: duration(v.start),
			end: duration(v.end),
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
			moment: v.time > 0 ? duration(v.time) : '-' + duration(Math.abs(v.time))
		}))
}
