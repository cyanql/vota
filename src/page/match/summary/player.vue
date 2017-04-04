<template>
	<dd class="row">
		<figure class="row-avator-wrapper">
			<d-avator class="row-avator" :src="player.heroImage"></d-avator>
			<span class="row-avator-level">{{player.level}}</span>
		</figure>
		<div class="row-info">
            <div class="row-info-header" @click="getOtherUserMatchesFetch(player)">
                <span class="row-info-username">{{player.personaname || '匿名'}}</span>
                <span class="row-info-solo-rank" v-if="player.solo_competitive_rank">{{player.solo_competitive_rank}}</span>
            </div>
            <div class="row-info-content">
    			<div class="row-info-content-left">
    				<div>参战率：{{player.fightPercent}}</div>
    				<div>伤害：{{player.damagePercent}}</div>
    			</div>
    			<div class="row-info-content-right">
    				<div>{{[player.kills, player.deaths, player.assists].join('/')}}</div>
    				<div>KDA：{{player.kda}}</div>
    			</div>
            </div>
		</div>
		<div class="row-right">
			<div class="row-items">
				<d-avator class="row-item" :src="player.item_0"></d-avator>
				<d-avator class="row-item" :src="player.item_1"></d-avator>
				<d-avator class="row-item" :src="player.item_2"></d-avator>
			</div>
			<div class="row-items">
				<d-avator class="row-item" :src="player.item_3"></d-avator>
				<d-avator class="row-item" :src="player.item_4"></d-avator>
				<d-avator class="row-item" :src="player.item_5"></d-avator>
			</div>
		</div>
	</dd>
</template>
<script>
import { mapActions } from 'vuex'
export default {
	props: ['player'],
    methods: mapActions([
        'getOtherUserMatchesFetch'
    ])
}
</script>

<style lang="scss" scoped>
@import "~src/style/variable";

.row {
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgba(0,0,0,.1);
	padding: 0 10px;
    height: 60px;
	font-size: 10px;

	&-avator {
	    width: 75px;

        &-wrapper {
    		position: relative;
        }

		&-level {
			position: absolute;
			right: 0;
			bottom: 0;
			color: white;
			background-color: rgba(0,0,0,.5);
		}
	}

	&-info {
	    flex: 1;
        padding: 0 10px;
        overflow: hidden;

        &-header {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
        }

        &-username {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;
            color: $red-9;
        }

        &-solo-rank {
            font-size: 10px;
            // padding-left: 10px;
            color: $blue-7;
        }

		&-content {
    		display: flex;
    		align-items: center;

            &-left {
    			flex: 1
    		}

            &-right {
    			text-align: right;
    		}
        }
	}

    &-items {
        display: flex;
        align-items: center;
    }

    &-item {
        flex: 1;
        // height: 20px;
        width: 27.5px;
        margin: 1px;
    }
}
</style>
