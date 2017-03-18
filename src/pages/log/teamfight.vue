<template>
	<div class="log-teamfight">
		<div class="log-players" @click="onClick">
			<div class="team">
				<figure v-for="player in radiant" class="hero" :class="player.class" v-if="player.damage" :style="`background-image: url(${player.hero_img})`"></figure>
			</div>
			<div class="team">
				<figure v-for="player in dire" class="hero" :class="player.class" v-if="player.damage" :style="`background-image: url(${player.hero_img})`"></figure>
			</div>
			<div class="log-info">
				<p>{{log.start}} - {{log.end}}</p>
				<p class="title">团战</p>
				<p>查看详情</p>
			</div>
		</div>
		<expand-transition>
			<div class="log-detail" v-show="detailVisible">
				<div class="team">
					<div v-for="player in radiant" v-if="player.damage">
						<p>{{player.deaths}}</p>
						<div class="bar-chart">
							<span>{{player.damage}}</span>
							<div class="inner" :style="`height: ${player.damage_percent}`"></div>
						</div>
						<figure v-for="ability in player.abilitys" :style="`background-image: url(${ability.img})`">{{ability.times}}</figure>
						<figure v-for="item in player.items" :style="`background-image: url(${item.img})`">{{item.times}}</figure>
					</div>
				</div>
				<div class="team">
					<div v-for="player in dire" v-if="player.damage">
						<p>{{player.deaths}}</p>
						<div class="bar-chart">
							<span>{{player.damage}}</span>
							<div class="inner" :style="`height: ${player.damage_percent}`"></div>
						</div>
						<figure v-for="ability in player.abilitys" :style="`background-image: url(${ability.img})`">{{ability.times}}</figure>
						<figure v-for="item in player.items" :style="`background-image: url(${item.img})`">{{item.times}}</figure>
					</div>
				</div>
			</div>
		</expand-transition>
	</div>
</template>

<script>
import ITEMS from 'src/constants/items'
import ExpandTransition from 'src/component/expand-transition'

const HOST = 'http://cdn.dota2.com'

export default {
	props: ['log'],
	data() {
		let total_damage = 0, players
		players = this.log.players.map(v => {
			v.class = {
				death: !!v.deaths
			}
			v.abilitys = Object.keys(v.ability_uses).map(key => {
				return {
					name: key,
					times: v.ability_uses[key],
					img: HOST + '/apps/dota2/images/abilities/' + key + '_sm.png'
				}
			})
			v.items = Object.keys(v.item_uses).map(key => {
				return {
					name: key,
					times: v.item_uses[key],
					img: HOST + ITEMS[key].img
				}
			})
			total_damage += v.damage
			return v
		})
		players = players.map(v => {
			v.damage_percent = (v.damage / total_damage * 100) + '%'
			return v
		})
		return {
			radiant: players.slice(0, 5),
			dire: players.slice(5),
			detailVisible: false
		}
	},
	methods: {
		onClick() {
			this.detailVisible = !this.detailVisible
		}
	},
	components: {
		ExpandTransition
	}
}
</script>

<style lang="scss">
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
		display: flex;
		color: #fff;
		justify-content: space-between;
		overflow: hidden;

		.team {
			display: flex;
			text-align: center;
		}

		.bar-chart {
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
			}
		}

		figure {
			// margin: 2px;
			border-radius: 0;
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
