<template>
	<d-scroller v-if="match">
		<table>
			<thead>
				<tr><th>结束时间</th><th>持续时间</th><th>Level</th><th>比赛模式</th></tr>
			</thead>
			<tbody>
				<tr>
					<td>{{match.fromNow}}</td>
					<td>{{match.duration}}</td>
					<td>{{match.skillLevel|| '无'}}</td>
					<td>{{match.gameMode}}</td>
				</tr>
			</tbody>
		</table>
		<d-team
			class="radiant"
			faction="天辉"
			:players="match.radiantPlayers"
			:win="match.radiant_win"
			:score="match.radiant_score"
			>
		</d-team>
		<d-team
			class="dire"
			faction="夜宴"
			:players="match.direPlayers"
			:win="!match.radiant_win"
			:score="match.dire_score"
			>
		</d-team>
        <d-card title="排名" icon="rank">
            <span slot="button">
                <d-icon icon="order"></d-icon>
                <select v-model="selectOptionValue">
                    <option value="gold_per_min">每分钟金钱</option>
                    <option value="xp_per_min">每分钟经验</option>
                    <option value="total_gold">总金钱</option>
                    <option value="total_xp">总经验</option>
                    <option value="level">英雄等级</option>
                    <option value="hero_damage">英雄伤害</option>
                    <option value="hero_healing">英雄治疗</option>
                    <option value="tower_damage">防御塔伤害</option>
                    <option value="last_hits">正补</option>
                    <option value="denies">反补</option>
                    <option value="kills">杀敌</option>
                    <option value="assists">助攻</option>
                    <option value="deaths">死亡</option>
                </select>
            </span>
            <div class="rank-row" v-for="player in players">
                <d-avator class="rank-avator" :src="player.heroImage"></d-avator>
                <span>{{player[selectOptionValue]}}</span>
                <div class="rank-indicator">
                    <div class="rank-percent" :style="`width: ${player.rankPercent}%`"></div>
                </div>
            </div>
        </d-card>
	</d-scroller>
</template>

<script>
import Team from './team'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            selectOptionValue: 'gold_per_min',
        }
    },
	computed: mapState({
		match: state => state.match,
        players(state) {
            const key = this.selectOptionValue
            const players = state.match.players.sort((p, n) => p[key] > n[key] ? -1 : p[key] < n[key] ? 1 : 0)
            const maxValue = players[0][key] / 100
            return players.map(v => ({
                ...v,
                rankPercent: v[key] / maxValue
            }))
        }
	}),
	components: {
		'd-team': Team
	}
}
</script>

<style lang="scss" scoped>
@import "~src/style/variable";

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

.rank {
    &-row {
        display: flex;
        align-items: center;
        font-size: 10px;
    }
    &-avator {
        padding-right: 10px;
    }
    &-indicator {
        flex: 1;
        padding: 0 10px;
    }
    &-percent {
        height: 2px;
        background-color: $blue-6;
    }
}
</style>
