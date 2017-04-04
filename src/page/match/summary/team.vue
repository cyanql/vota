<template>
	<dl class="team">
		<dt class="team-header">
			<div class="team-header-left">
				<span class="faction">{{faction}}</span>
				<span class="win">{{win ? '胜利' : '失败'}}</span>
			</div>
			<div class="team-header-right">
				<span>杀敌</span>
				<span>{{score}}</span>
			</div>
		</dt>
		<d-player
			v-for="(player, index) in players"
			:key="index"
			:player="player"
			>
		</d-player>
	</dl>
</template>
<script>
import Player from './player'

export default {
	props: ['players', 'faction', 'win', 'score'],
	components: {
		'd-player': Player
	}
}
</script>

<style lang="scss" scoped>
.team {
	margin: 10px 0;
	background-color: white;

	&.radiant {
		.team-header {
			border-top-color: #00a854;

			&-left {
				background-color: #00a854;
			}
		}
	}

	&.dire {
		.team-header {
			border-top-color: #b21;

			&-left {
				background-color: #b21;
			}
		}
	}

	&-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid #aaa;

		.faction {
			font-size: 12px;
		}

		&-left {
			color: white;
			padding-left: 10px;
			background-color: #aaa;

			&:after {
				content: '';
				position: relative;
				top: -20px;
				width: 0;
				height: 0;
				border-bottom: 25px solid white;
				border-left: 25px solid transparent;
			}
		}

		&-right {
			padding-right: 10px;
			font-size: 10px;
		}
	}
}
</style>
