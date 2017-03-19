<template>
	<div>
		<template v-for="log in match.logs">
			<d-teamfight class="log" v-if="log.type === 'teamfight'" :log="log"></d-teamfight>
			<d-row v-else class="log" :class="log.isRadiant ? 'left' : 'right'" :log="log"></d-row>
		</template>
		<footer>
			{{match.radiant_win ? '天辉' : '夜宴'}} 胜利
		</footer>
	</div>
</template>

<script>
import Row from './component/row'
import Teamfight from './component/teamfight'
import { mapState } from 'vuex'

export default {
	computed: mapState({
		match: state => state.match
	}),
	components: {
		dTeamfight: Teamfight,
		dRow: Row
	}
}
</script>

<style lang="scss">
.log {
	position: relative;
	display: flex;
	align-items: center;
	height: 50px;
	border-bottom: 1px solid #ddd;

	&.left {
		justify-content: flex-start;
	}

	&.right {
		justify-content: flex-end;
	}

	figure {
		width: 30px;
		height: 25px;
		line-height: 25px;
		border-radius: 3px;
		vertical-align: bottom;
    	background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		text-shadow: 0 0 1px black;
		color: #ddd;
		font-size: 10px;

		&.rune,
		&.hero {
			width: 30px;
			height: 30px;
		}

		&.hero {
			border-radius: 50%;
		}
	}
}

footer {
	text-align: center;
	line-height: 100px;
	font-size: 25px;
}
</style>
