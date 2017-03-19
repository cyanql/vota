<template>
	<div v-if="match">
		<table>
			<thead>
				<tr><th>结束时间</th><th>持续时间</th><th>Level</th><th>比赛模式</th></tr>
			</thead>
			<tbody>
				<tr>
					<td>{{match.from_now}}</td>
					<td>{{match.duration}}</td>
					<td>{{match.lobby_type}}</td>
					<td>{{match.game_mode}}</td>
				</tr>
			</tbody>
		</table>
		<d-team
			class="radiant"
			faction="天辉"
			:players="match.radiant_players"
			:win="match.radiant_win"
			:score="match.radiant_score"
			>
		</d-team>
		<d-team
			class="dire"
			faction="夜宴"
			:players="match.dire_players"
			:win="!match.radiant_win"
			:score="match.dire_score"
			>
		</d-team>
	</div>
</template>

<script>
import Team from './component/team'
import { mapState } from 'vuex'

export default {
	computed: mapState({
		match: state => state.match
	}),
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
