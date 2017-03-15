<template>
	<div>
		<div v-if="oMatch">
			<table>
				<thead>
					<tr><th>结束时间</th><th>持续时间</th><th>Level</th><th>比赛模式</th></tr>
				</thead>
				<tbody>
					<tr>
						<td>{{oMatch.dist_now}}</td>
						<td>{{oMatch.duration_hour}}</td>
						<td>{{oMatch.lobby_type}}</td>
						<td>{{oMatch.game_mode}}</td>
					</tr>
				</tbody>
			</table>
			<d-team
				class="radiant"
				faction="天辉"
				:players="oMatch.radiant_players"
				:win="oMatch.radiant_win"
				:score="oMatch.radiant_score"
				>
			</d-team>
			<d-team
				class="dire"
				faction="夜宴"
				:players="oMatch.dire_players"
				:win="!oMatch.radiant_win"
				:score="oMatch.dire_score"
				>
			</d-team>
		</div>
	</div>
</template>

<script>
import Team from 'src/components/team'
import DateLib from 'src/lib/DateLib'
import HERO_MAP from 'src/constants/heroMap'
import ITEM_MAP from 'src/constants/itemMap'
import API from 'src/constants/api'

function percentify(decimal) {
	return (decimal * 100).toFixed(1) + '%'
}

export default {
	data() {
		return {
			match_id: '',
			match: process.env.NODE_ENV === 'development' ? require('src/../.data/match.json') : null
		}
	},
	computed: {
		oMatch() {
			const match = this.match
			if (match) {
				match.dist_now = DateLib.getDistanceNow(new Date(match.start_time * 1000))
				match.duration_hour = Math.round(match.duration / 60) + '分钟'
				match.players.forEach(v => {
					v.hero_img = API.HOST + HERO_MAP[v.hero_id].img
					v.item_0 = API.HOST + (ITEM_MAP[v.item_0] || {}).img
					v.item_1 = API.HOST + (ITEM_MAP[v.item_1] || {}).img
					v.item_2 = API.HOST + (ITEM_MAP[v.item_2] || {}).img
					v.item_3 = API.HOST + (ITEM_MAP[v.item_3] || {}).img
					v.item_4 = API.HOST + (ITEM_MAP[v.item_4] || {}).img
					v.item_5 = API.HOST + (ITEM_MAP[v.item_5] || {}).img
				})

				match.radiant_players = []
				match.dire_players = []
				match.players.forEach(v => {
					if (v.isRadiant) {
						v.fight_ratio = percentify((v.assists + v.kills) / match.radiant_score)
						match.radiant_players.push(v)
					} else {
						v.fight_ratio = percentify((v.assists + v.kills) / match.dire_score)
						match.dire_players.push(v)
					}
				})
				match.radiant_damage = match.radiant_players.reduce((p, v) => p + v.hero_damage, 0)
				match.dire_damage = match.dire_players.reduce((p, v) => p + v.hero_damage, 0)
				match.radiant_players.forEach(v => {
					v.demage_per = percentify(v.hero_damage / match.radiant_damage)
				})
				match.dire_players.forEach(v => {
					v.demage_per = percentify(v.hero_damage / match.dire_damage)
				})
			}
			return match
		}
	},
	components: {
		'd-team': Team
	}
}
</script>

<style lang="scss">

body {
	background-color: #eee;
}

h1 {
	text-align: center;
	padding: 10px;
}

table {
	width: 100%;
	text-align: center;
	margin: 5px 0;
	background-color: white;

	th {
		color: #999;
	}

	tr {
		line-height: 2;
	}
}

.radiant {
	.d-team-header {
		border-top-color: #00a854;

		& > .left {
			background-color: #00a854;
		}
	}
}

.dire {
	.d-team-header {
		border-top-color: #b21;

		& > .left {
			background-color: #b21;
		}
	}
}
</style>
