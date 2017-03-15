<template>
	<div>
		<h1>玩家ID：<input v-model="player_id"><button @click="onClick">确认</button></h1>
		<div class="match-row" v-for="match in oMatches">
			<span class="win" v-if="match.win">胜利</span>
			<span class="lose" v-else>失败</span>
			<span class="dist-now">{{match.dist_now}}</span>
			<span>{{[match.kills, match.deaths, match.assists].join('/')}}</span>
			<img class="hero-avatar" :src="match.hero_img" alt="">
		</div>
	</div>
</template>

<script>
import API from 'src/constants/api'
import DateLib from 'src/lib/DateLib'
import HERO_MAP from 'src/constants/heroMap'

export default {
	data() {
		return {
			player_id: '',
			matches: process.env.NODE_ENV === 'development' ? require('src/../.data/matches.json') : []
		}
	},
	computed: {
		oMatches() {
			return this.matches.map(match => {
				match.hero_img = API.HOST + HERO_MAP[match.hero_id].img
				match.win = match.player_slot < 5 ? match.radiant_win : !match.radiant_win
				match.dist_now = DateLib.getDistanceNow(new Date(match.start_time * 1000))
				return match
			})
		}
	},
	methods: {
		onClick() {
			API.request(API.players.matches, {param: this.player_id})
			.then(res => res.json())
			.then(json => {
				this.matches = json
			})
		}
	},
}
</script>

<style lang="scss" scoped>
.match-row {
	display: flex;
	align-items: center;

	.hero-avatar {
		width: 50px;
	}

	.win {
		color: #00a854;
	}

	.lose {
		color: #b21;
	}

	.dist-now {
		flex: 1;
	}

	span {
		padding: 5px;
	}
}
</style>
