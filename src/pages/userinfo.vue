<template>
	<div>
		<div class="match-row" :class="match.parsed && 'parsed'" v-for="match in matches" @click="getMatchFetch(match.match_id)">
			<img class="avator" :src="match.hero_img" alt="">
			<div class="flex-1">
				<span class="kda">{{[match.kills, match.deaths, match.assists].join('/')}}</span>
				<p class="from-now">{{match.from_now}}</p>
			</div>
			<p class="win" v-if="match.win">胜利</p>
			<p class="lose" v-else>失败</p>
		</div>
	</div>
</template>

<script>
import API from 'src/constants/api'
import DateLib from 'src/lib/DateLib'
import HERO_MAP from 'src/constants/heroMap'
import { mapState, mapActions } from 'vuex'

export default {
	computed: mapState({
		matches: state => state.matches
	}),
	methods: {
		...mapActions([
			'getMatchFetch'
		])
	}
}
</script>

<style lang="scss" scoped>
.match-row {
	display: flex;
	align-items: center;
	border-bottom: 1px solid #ddd;
	padding: 5px 10px;

	&.parsed {
		border-right: 1px solid blue;
	}

	.avator {
		height: 30px;
		padding-right: 10px;
	}

	.flex-1 {
		flex: 1;
	}

	.win {
		color: #00a854;
	}

	.lose {
		color: #b21;
	}

	.from-now {
		font-size: 10px;
		color: #aaa;
	}
}
</style>
