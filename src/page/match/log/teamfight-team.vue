<template lang="html">
    <div class="teamfight-team">
        <div class="teamfight-col" v-for="player in players" v-if="player.damage">
            <div class="teamfight-xp-chart">
                <span>{{player.xp_delta}}</span>
                <div class="teamfight-xp-chart--inner" :style="`height: ${player.xpPercent}`"></div>
            </div>
            <div class="teamfight-gold-chart">
                <span>{{player.gold_delta}}</span>
                <div class="teamfight-gold-chart--inner" :class="player.gold_delta < 0 && 'negative'" :style="`height: ${player.goldPercent};`"></div>
            </div>
            <div class="teamfight-damage-chart">
                <span>{{player.damage}}</span>
                <div class="teamfight-damage-chart--inner" :style="`height: ${player.damagePercent}`"></div>
            </div>
            <figure class="rectangle" v-for="ability in player.abilities" :style="`background-image: url(${ability.img})`">{{ability.times}}</figure>
            <hr class="placeholder">
            <figure class="rectangle" v-for="item in player.items" :style="`background-image: url(${item.img})`">{{item.times}}</figure>
        </div>
    </div>
</template>

<script>
export default {
    props: ['players']
}
</script>

<style lang="scss" scoped>

.teamfight {
    &-team {
    	display: flex;
    	text-align: center;
    }

    &-col {
		display: flex;
		flex-direction: column;
    }

    &-gold-chart,
    &-xp-chart,
    &-damage-chart {
        position: relative;
        width: 30px;
        height: 30px;
        background-color: #222;
        font-size: 10px;
        margin-bottom: 5px;

        &--inner {
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
</style>
