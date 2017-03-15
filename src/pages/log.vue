<template>
	<div>
		<div class="log" v-for="log in logs">
			<img :src="log.hero_img" alt="">
			kills
			<img :src="log.kills_hero_img" alt="">
			<img :src="log.item_img" alt="">
			<span>{{log.time}}</span>
			<span>{{log.incident}}</span>
		</div>
	</div>
</template>

<script>
import zh_CN from 'src/constants/lang/zh-CN.json'
import HEROS from 'src/constants/heros'
import HERO_MAP from 'src/constants/heroMap'
import ITEMS from 'src/constants/items'
import API from 'src/constants/api'

console.log(HERO_MAP)

export default {
	data() {
		return {
			match: process.env.NODE_ENV === 'development' ? require('src/../.data/match.detail.json') : null
		}
	},
	computed: {
		logs() {
			const { match } = this
			let logs = []
			if (match) {
				match.objectives.forEach(v => {
					v.incident = zh_CN[v.type]
					logs.push(v)
				})
				match.players.forEach(v => {
					v.kills_log.forEach(w => {
						w.hero_img = API.HOST + HERO_MAP[v.hero_id].img
						w.kills_hero_img = API.HOST + HEROS[w.key].img
						logs.push(w)
					})
					v.runes_log.forEach(w => {
						w.incident = '神符'
						logs.push(w)
					})
					v.purchase_log.forEach(w => {
						w.item_img = API.HOST + ITEMS[w.key].img
						logs.push(w)
					})
				})
				logs = logs
				.sort((p, n) => p.time < n.time ? -1 : p.time > n.time ? 1 : 0)
				.map(v => {
					v.time = (v.time / 60).toFixed(1) + '/min'
					return v
				})
			}
			return logs
		}
	}
}
</script>

<style lang="scss">
.log {
	display: flex;
	align-items: center;
	justify-content: space-between;

	img {
		width: 50px;
	}
}
</style>
