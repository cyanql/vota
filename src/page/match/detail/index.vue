<template>
	<d-scroller class="d-match-detail" v-if="match">
        <d-card title="热力图" icon="hotfill">
    		<div ref="heatmap" class="heat-map">
    			<img :src="MAP_IMG" alt="">
    		</div>
    		<div class="heros">
    			<img v-for="(player, index) in match.players" :class="heroIndex === index && 'selected'" :src="player.heroImage" @click="updateHeatMap(index)"></img>
    		</div>
        </d-card>
        <d-card title="视野" icon="attentionfill">
    		<div class="vision-map">
    			<img :src="MAP_IMG" alt="">
    			<div class="vision" v-for="vision in visions" :class="[vision.isRadiant ? 'radiant' : 'dire', vision.type]" :style="`left: ${vision.x}; top: ${vision.y}; width: ${vision.width}px; height: ${vision.width}px`"></div>
    		</div>
        </d-card>
	</d-scroller>
</template>

<script>
import { mapState } from 'vuex'
import API from 'src/constant/api'
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
		match: state => state.match,
		visions(state) {
			const senWidth = document.body.offsetWidth / 12
			const obsWidth = senWidth * 1600 / 850
			const scale = document.body.offsetWidth / 128
			return state.match.visions.map(v => ({
				...v,
				x: (v.x - 64) * scale - 25 + 'px',
				y: (128 + 64 - v.y) * scale - 25 + 'px',
				width: v.type === 'sen' ? senWidth : obsWidth
			}))
		}
	}),
	methods: {
		updateHeatMap(index) {
			const scale = this.scale
			const data = (this.match.players[index].lane_positions || []).map(v => ({
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

.vision-map {
	position: relative;

	.vision {
		position: absolute;
		border: 2px solid green;
		border-radius: 50%;
		width: 50px;
		height: 50px;

		&.radiant {
			border-color: green;
		}

		&.dire {
			border-color: red;
		}

		&.sen {
			background-color: rgba(0,0,255,.25);
		}

		&.obs {
			background-color: rgba(255,255,0,.25);
		}
	}
}

.vision-map,
.heat-map {
	img {
		width: 100%;
		vertical-align: bottom;
	}
}
</style>
