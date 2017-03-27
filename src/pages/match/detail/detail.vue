<template>
	<div class="d-match-detail" v-if="match">
		<div ref="heatmap" class="heatmap">
			<img :src="MAP_IMG" alt="">
		</div>
		<div class="heros">
			<img v-for="(player, index) in match.players" :class="heroIndex === index && 'selected'" :src="player.hero_img" @click="updateHeatMap(index)"></img>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { parsePositions } from 'src/util'
import { API } from 'src/constants'
import h337 from 'heatmap.js'

export default {
	data() {
		return {
			MAP_IMG: API.MAP,
			heatmap: null,
			heroIndex: 0,
			scale: 1
		}
	},
	computed: mapState({
		match: state => state.match
	}),
	methods: {
		updateHeatMap(index) {
			const scale = this.scale
			const data = this.match.players[index].lane_positions.map(v => ({
				x: Math.round(v.x * scale),
				y: Math.round(v.y * scale),
				value: v.value + 15
			}))
			const max = Math.max.apply(null, data.map(v => v.value))
			this.heatmap.setData({
				min: 0,
				max,
				data
			})
			this.heroIndex = index
		}
	},
	mounted() {
		const heatmapEl = this.$refs.heatmap
		const width = heatmapEl.offsetWidth
		heatmapEl.style.height = width + 'px'
		this.scale = width / .5 ** .5 / 128

		this.heatmap = h337.create({
			container: heatmapEl,
			radius: 10
		})
		this.updateHeatMap(this.heroIndex)

	}
}
</script>

<style lang="scss" scoped>
.d-match-detail {
	background-color: black;
}

.heros {
	img {
		display: inline-block;
		width: 20%;
		vertical-align: bottom;

		&:not(.selected) {
			filter: grayscale(100%);
		}
	}
}

.heatmap {
	img {
		width: 100%;
		vertical-align: bottom;
	}
}
</style>
