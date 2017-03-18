<template>
	<div>
		<template v-for="log in logs">
			<d-teamfight class="log" v-if="log.type === 'teamfight'" :log="log"></d-teamfight>
			<d-row v-else class="log" :class="log.isRadiant ? 'left' : 'right'" :log="log"></d-row>
		</template>
		<footer>
			{{match.radiant_win ? '天辉' : '夜宴'}} 胜利
		</footer>
	</div>
</template>

<script>
import zh_CN from 'src/constants/lang/zh-CN.json'
import HEROS from 'src/constants/heros'
import HERO_MAP from 'src/constants/heroMap'
import ITEMS from 'src/constants/items'
import RUNE_MAP from 'src/constants/runeMap'
import DateLib from 'src/lib/DateLib'
import Row from './row'
import Teamfight from './teamfight'

const HOST = 'http://cdn.dota2.com'

export default {
	data() {
		return {
			match: process.env.NODE_ENV === 'development' ? require('src/../.data/match.detail.json') : null
		}
	},
	computed: {
		logs() {
			const { match } = this
			let logs = [], player_imgs = []
			if (match) {
				// match.objectives.forEach(v => {
				// 	v.isRadiant = v.player_slot < 5
				// 	v.incident = zh_CN[v.type]
				// 	logs.push(v)
				// })
				match.players.forEach(v => {
					const purchase = []
					const hero_img = HOST + HERO_MAP[v.hero_id].img
					const isRadiant = v.isRadiant

					player_imgs.push(hero_img)

					v.kills_log.forEach(w => {
						logs.push({
							type: 'kill',
							kills_hero_img: HOST + HEROS[w.key].img,
							time: w.time,
							hero_img,
							isRadiant
						})
					})
					v.purchase_log.forEach(w => {
						logs.push({
							type: 'purchase',
							item_img: HOST + ITEMS[w.key].img,
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
					logs.push({
						type: 'teamfight',
						start: DateLib.duration(v.start),
						end: DateLib.duration(v.end),
						time: v.start,
						players: v.players.map((w, index) => {
							w.hero_img = player_imgs[index]
							return w
						})
					})
				})
				logs = logs
				.sort((p, n) => p.time < n.time ? -1 : p.time > n.time ? 1 : 0)
				.map(v => {
					v.time = v.time > 0 ? DateLib.duration(v.time) : '-' + DateLib.duration(Math.abs(v.time))
					return v
				})
			}
			return logs
		}
	},
	components: {
		dTeamfight: Teamfight,
		dRow: Row
	}
}
</script>

<style lang="scss">
.log {
	position: relative;
	display: flex;
	align-items: center;
	height: 50px;
	border-bottom: 1px solid #ddd;

	&.left {
		justify-content: flex-start;
	}

	&.right {
		justify-content: flex-end;
	}

	figure {
		width: 30px;
		height: 25px;
		line-height: 25px;
		border-radius: 3px;
		vertical-align: bottom;
    	background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		text-shadow: 0 0 1px black;
		color: #ddd;
		font-size: 10px;

		&.rune,
		&.hero {
			width: 30px;
			height: 30px;
		}

		&.hero {
			border-radius: 50%;
		}
	}
}

footer {
	text-align: center;
	line-height: 100px;
	font-size: 25px;
}
</style>
