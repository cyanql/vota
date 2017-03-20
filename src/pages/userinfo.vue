<template>
	<div>
		<div>
			<div class="match-row" v-for="match in matches" @click="getMatchFetch(match.match_id)">
				<span class="win" v-if="match.win">胜利</span>
				<span class="lose" v-else>失败</span>
				<span class="dist-now">{{match.from_now}}</span>
				<span>{{[match.kills, match.deaths, match.assists].join('/')}}</span>
				<img class="hero-avatar" :src="match.hero_img" alt="">
			</div>
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
