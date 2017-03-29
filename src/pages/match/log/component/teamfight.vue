<template>
	<div class="log-teamfight">
		<div class="log-players" @click="onClick">
			<div class="team">
				<figure v-for="player in log.radiant_players" class="hero square" :class="player.deaths && 'death'" v-if="player.damage" :style="`background-image: url(${player.hero_img})`"></figure>
			</div>
			<div class="team">
				<figure v-for="player in log.dire_players" class="hero square" :class="player.deaths && 'death'" v-if="player.damage" :style="`background-image: url(${player.hero_img})`"></figure>
			</div>
			<div class="log-info">
				<p>{{log.start}} - {{log.end}}</p>
				<p class="title">团战</p>
				<p>查看详情</p>
			</div>
		</div>
		<expand-transition>
			<div class="log-detail" v-show="detailVisible">
				<div class="log-detail-data">
					<div class="team">
						<div v-for="player in log.radiant_players" v-if="player.damage">
							<div class="xp-chart">
								<span>{{player.xp_delta}}</span>
								<div class="inner" :style="`height: ${player.xp_percent}`"></div>
							</div>
							<div class="gold-chart">
								<span>{{player.gold_delta}}</span>
								<div class="inner" :class="player.gold_delta < 0 && 'negative'" :style="`height: ${player.gold_percent};`"></div>
							</div>
							<div class="damage-chart">
								<span>{{player.damage}}</span>
								<div class="inner" :style="`height: ${player.damage_percent}`"></div>
							</div>
							<figure class="rectangle" v-for="ability in player.abilities" :style="`background-image: url(${ability.img})`">{{ability.times}}</figure>
							<hr class="placeholder">
							<figure class="rectangle" v-for="item in player.items" :style="`background-image: url(${item.img})`">{{item.times}}</figure>
						</div>
					</div>
					<div class="title">
						<p class="chart-title">经验</p>
						<p class="chart-title">经济</p>
						<p class="chart-title">伤害</p>
						<p>技能</p>
						<hr class="placeholder">
						<p>物品</p>
					</div>
					<div class="team">
						<div v-for="player in log.dire_players" v-if="player.damage">
							<div class="xp-chart">
								<span>{{player.xp_delta}}</span>
								<div class="inner" :style="`height: ${player.xp_percent}`"></div>
							</div>
							<div class="gold-chart">
								<span>{{player.gold_delta}}</span>
								<div class="inner" :class="player.gold_delta < 0 && 'negative'" :style="`height: ${player.gold_percent}`"></div>
							</div>
							<div class="damage-chart">
								<span>{{player.damage}}</span>
								<div class="inner" :style="`height: ${player.damage_percent}`"></div>
							</div>
							<figure class="rectangle" v-for="ability in player.abilities" :style="`background-image: url(${ability.img})`">{{ability.times}}</figure>
							<hr class="placeholder">
							<figure class="rectangle" v-for="item in player.items" :style="`background-image: url(${item.img})`">{{item.times}}</figure>
						</div>
					</div>
				</div>
				<div class="log-detail-summary">
					<span class="title">死亡地点</span>
					<div class="toolbar">
						<span @click="decreaseImageScale()">-</span>
						<span @click="increaseImageScale()">+</span>
					</div>
					<div class="zoom-box" :style="`height: ${imageHeight}`">
						<figure :style="`width: ${imageScale}00%`">
							<img :src="log.map_img" alt="">
							<template v-for="player in log.players">
								<figure class="log-detail-death-pos" v-for="position in player.positions" :style="`left: ${position.x}%; top: ${position.y}%; background-image: url(${player.hero_icon})`"></figure>
							</template>
						</figure>
					</div>
				</div>
			</div>
		</expand-transition>
	</div>
</template>

<script>
import ITEMS from 'src/constants/items'
import ExpandTransition from 'src/component/expand-transition'

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
		ExpandTransition
	}
}
</script>

<style lang="scss" scoped>
.log {
	&-teamfight {
		display: block;
		background-color: #333;
		height: inherit;
	}


	&-players {
		position: relative;
		display: flex;
		justify-content: space-between;
		height: 75px;

		.team {
			display: flex;
			align-items: center;
		}

		figure {
			&.death {
				filter: grayscale(100%);
			}
		}
	}

	&-detail {
		&-data {
			position: relative;
			display: flex;
			color: #fff;
			overflow: hidden;
			justify-content: space-between;

			.team {
				display: flex;
				text-align: center;

				& > div {
					display: flex;
					flex-direction: column;

					.gold-chart,
					.xp-chart,
					.damage-chart {
						position: relative;
						width: 30px;
						height: 30px;
						background-color: #222;
						font-size: 10px;
						margin-bottom: 5px;

						.inner {
							width: 100%;
							position: absolute;
							bottom: 0;
							background-color: #f00;

							&.negative {
								background-color: #00f;
							}
						}
					}
				}
			}

			.title {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: #fff;
				font-size: 10px;
				height: 100%;
				display: flex;
				flex-direction: column;
				text-align: center;

				& > .chart-title {
					min-height: 30px;
					margin-bottom: 5px;
				}
			}

			hr.placeholder {
				border: none;
				flex: 1;
				min-height: 30px;
			}

			figure {
				border-radius: 0;
			}
		}

		&-summary {
			position: relative;
			color: white;
			overflow: scroll;

			.title {
				position: absolute;
				left: 0;
				z-index: 1;
				line-height: 30px;
				padding-left: 10px;
			}
			.toolbar {
				position: absolute;
				right: 0;
				z-index: 1;

				& > span {
					display: inline-block;
					width: 30px;
					line-height: 30px;
					text-align: center;
					font-size: 20px;
					font-weight: 500;
				}
			}

			.zoom-box {
			 	overflow: scroll;

				& > figure {
	   				position: relative;
	   				background-size: cover;

	   				& > img {
	   					width: 100%;
	   					vertical-align: bottom;
	   				}

	   				& > figure.log-detail-death-pos {
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
	}

	&-info {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		text-align: center;
		font-size: 10px;

		.title {
			display: inline-block;
			background-color: #f00;
			margin: 2px;
			padding: 1px 2px;
			border-radius: 2px;
		}
	}
}
</style>
