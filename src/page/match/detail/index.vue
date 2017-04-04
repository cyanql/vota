<template>
	<d-scroller class="d-match-detail">
        <d-card title="热力图" icon="hotfill">
    		<div ref="heatmap" class="heat-map">
    			<img :src="MAP_IMG" alt="">
    		</div>
    		<div class="heros">
    			<img v-for="(heat, index) in heats" :class="heroIndex === index && 'selected'" :src="heat.heroImage" @click="updateHeatMap(index)"></img>
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
			heroIndex: 0
		}
	},
	computed: mapState({
		heats: state => state.match.heats,
		visions: state => state.match.visions
	}),
	methods: {
		updateHeatMap(index) {
            const heat = this.heats[index]
			this.heatmap.setData({
				min: heat.min,
				max: heat.max,
				data: heat.positions
			})
			this.heroIndex = index
		}
	},
	mounted() {
		this.heatmap = h337.create({
			container: this.$refs.heatmap,
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
    position: relative;
    width: 100%;
    padding-bottom: 100%;

	img {
	    position: absolute;
        top: 0;
        left: 0;
		width: 100%;
		vertical-align: bottom;
	}
}
</style>
