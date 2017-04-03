<template>
    <d-container>
        <d-nav :title="user.account_id" @left-click="goBack"></d-nav>
        <d-scroller @lazy="onLazy">
    	    <d-card title="比赛" icon="selection">
        		<div class="match-row list-item" v-for="match in matches" @click="getMatchFetch(match.match_id)">
        			<d-avator class="avator" :src="match.heroImage"></d-avator>
        			<div class="flex-1">
        				<span class="kda">{{[match.kills, match.deaths, match.assists].join('/')}}</span>
        				<div class="from-now">
                            <span>{{match.fromNow}}</span>
                            <span>{{match.skillLevel}}</span>
                        </div>
        			</div>
                    <span class="indicator" v-if="match.parsed"></span>
        			<span class="win" v-if="match.win">胜利</span>
        			<span class="lose" v-else>失败</span>
        		</div>
        	</d-card>
        </d-scroller>
    </d-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            offset: 0
        }
    },
	computed: mapState({
        user: state => state.status.history.user,
		matches(state) {
            return state.matches
        }
	}),
	methods: {
		...mapActions([
			'getMatchFetch',
            'getOffsetMatchesFetch'
		]),
        onLazy() {
            this.offset += 20
            this.getOffsetMatchesFetch(this.offset)
        },
        goBack() {
            this.$router.go(-1)
        }
	}
}
</script>

<style lang="scss" scoped>
@import "~src/style/variable";

.match-row {
    height: 50px;
    border-right: 2px solid transparent;

	&.parsed {
		border-right-color: $blue-6;
	}

	.flex-1 {
        padding-left: 10px;
		flex: 1;
	}

    .indicator {
        width: 5px;
        height: 5px;
        background-color: $blue-6;
        display: inline-block;
        border-radius: 50%;
        margin-right: 10px;
    }

	.win {
		color: $green-6;
	}

	.lose {
		color: $red-6;
	}

	.from-now {
		font-size: 10px;
		color: #aaa;
	}
}
</style>
