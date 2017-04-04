<template>
	<div class="log-teamfight">
		<div class="log-players" @click="onClick">
			<div>
				<figure class="log-avator hero square" v-for="player in log.radiantPlayers" :class="player.deaths && 'death'" v-if="player.damage" :style="`background-image: url(${player.heroImage})`"></figure>
			</div>
			<div>
				<figure class="log-avator hero square" v-for="player in log.direPlayers" :class="player.deaths && 'death'" v-if="player.damage" :style="`background-image: url(${player.heroImage})`"></figure>
			</div>
			<div class="log-info">
				<div>{{log.start}} - {{log.end}}</div>
				<div class="log-info-title">团战</div>
				<div>查看详情</div>
			</div>
		</div>
		<expand-transition>
			<div class="log-detail" v-show="detailVisible">
				<div class="log-detail-data">
                    <d-log-teamfight-team :players="log.radiantPlayers"></d-log-teamfight-team>
					<div class="log-detail-info">
						<div class="log-detail-info-chart-title">经验</div>
						<div class="log-detail-info-chart-title">经济</div>
						<div class="log-detail-info-chart-title">伤害</div>
						<div>技能</div>
						<hr class="placeholder">
						<div>物品</div>
					</div>
                    <d-log-teamfight-team :players="log.direPlayers"></d-log-teamfight-team>
				</div>
				<div class="log-detail-summary">
					<span class="log-detail-summary-title">死亡地点</span>
					<div class="log-detail-summary-toolbar">
						<span class="log-detail-summary-toolbar-btn" @click="decreaseImageScale()">-</span>
						<span class="log-detail-summary-toolbar-btn" @click="increaseImageScale()">+</span>
					</div>
					<div class="log-detail-summary-zoom-box" :style="`height: ${imageHeight}`">
						<figure class="log-detail-summary-map" :style="`width: ${imageScale}00%`">
							<img class="log-detail-summary-map--inner" :src="log.map_img">
							<template v-for="player in log.players">
								<figure class="log-detail-summary-death-pos" v-for="position in player.positions" :style="`left: ${position.x}%; top: ${position.y}%; background-image: url(${player.heroIcon})`"></figure>
							</template>
						</figure>
					</div>
				</div>
			</div>
		</expand-transition>
	</div>
</template>

<script>
import dLogTeamfightTeam from './teamfight-team'

export default {
	props: ['log'],
	data() {
		return {
			detailVisible: false,
			imageScale: 1,
			imageHeight: document.body.offsetWidth + 'px',
		}
	},
	methods: {
		onClick() {
			this.detailVisible = !this.detailVisible
		},
		decreaseImageScale() {
			this.imageScale = this.imageScale === 1 ? this.imageScale : this.imageScale - 1
		},
		increaseImageScale() {
			this.imageScale = this.imageScale === 3 ? this.imageScale : this.imageScale + 1
		}
	},
    components: {
        dLogTeamfightTeam
    }
}
</script>

<style lang="scss" scoped>
@mixin info-wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
}

@mixin info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 10px;
}

.log {
	&-teamfight {
		display: block;
		background-color: #333;
		height: inherit;
	}


	&-players {
	    @include info-wrapper;
        align-items: center;
		height: 75px;
	}

    &-avator {
        display: inline-block;

        &.death {
            filter: grayscale(100%);
        }
    }

	&-info {
	    @include info;
		color: #fff;

		&-title {
			display: inline-block;
			background-color: #f00;
			margin: 2px;
			padding: 1px 2px;
			border-radius: 2px;
		}
	}

	&-detail {
		&-data {
		    @include info-wrapper;
			color: #fff;
		}

        &-info {
            @include info;
            color: #fff;
            height: 100%;
            display: flex;
            flex-direction: column;

            &-chart-title {
                min-height: 30px;
                margin-bottom: 5px;
            }
        }

		&-summary {
			position: relative;
			color: white;
			overflow: scroll;

			&-title {
				position: absolute;
				left: 0;
				z-index: 1;
				line-height: 30px;
				padding-left: 10px;
			}

			&-toolbar {
				position: absolute;
                top: 0;
				right: 0;
				z-index: 1;

				&-btn {
					display: inline-block;
					width: 30px;
					line-height: 30px;
					text-align: center;
					font-size: 20px;
					font-weight: 500;
				}
			}

			&-zoom-box {
			 	overflow: scroll;
			}

            &-map {
                position: relative;
                background-size: cover;
            }

            &-map--inner {
                width: 100%;
                vertical-align: bottom;
            }

            &-death-pos {
                position: absolute;
                width: 30px;
                height: 30px;
                background-position: center;
                background-size: cover;
                transform: translate(-50%, -50%);
            }
		}
	}
}
</style>
