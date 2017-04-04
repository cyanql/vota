<template>
    <d-scroller class="log-contianer" @lazy="onLazy">
        <d-card title="过滤器" icon="filter">
    		<div class="log-filters">
    			<span class="log-filter" :class="filters[key].value && 'opened'" v-for="key in Object.keys(filters)" @click="toggleFilter(key)">{{filters[key].name}}</span>
    		</div>
    		<div class="log-filter-cost">
    			<span>物品金额</span>
    			<input type="tel" v-model.lazy.number="filterCost">
    		</div>
        </d-card>
        <d-card title="日志列表" icon="list">
    		<template v-for="(log, index) in logs">
    			<d-log-teamfight class="log-row" v-if="log.type === 'teamfight'" :log="log" v-show="index < limit"></d-log-teamfight>
    			<d-log-normal v-else class="log-row" :class="log.isRadiant ? 'left' : 'right'" :log="log" v-show="index < limit"></d-log-normal>
    		</template>
    		<footer>
    			{{match.radiant_win ? '天辉' : '夜宴'}} 胜利
    		</footer>
        </d-card>
    </d-scroller>
</template>

<script>
import dLogNormal from './normal'
import dLogTeamfight from './teamfight'
import { mapState } from 'vuex'

export default {
	data() {
		return {
			filters: {
				kill: {
					name: '击杀',
					value: true
				},
				purchase: {
					name: '装备',
					value: true
				},
				teamfight: {
					name: '团战',
					value: true
				},
				rune: {
					name: '神符',
					value: false
				}
			},
			filterCost: 1000,
            limit: 20
		}
	},
	computed: mapState({
		match: state => state.match,
		logs(state) {
			return state.match.logs
				.filter(v => v.type === 'purchase' ? this.filters[v.type].value && v.cost > this.filterCost : this.filters[v.type].value)
		}
	}),
	methods: {
		toggleFilter(key) {
			this.filters[key].value = !this.filters[key].value
		},
        onLazy() {
            this.limit += 20
        }
	},
	components: {
		dLogTeamfight,
		dLogNormal
	}
}
</script>

<style lang="scss" scoped>
.log {
	&-filters {
		display: flex;
		flex-wrap: wrap;
		padding: 5px 0;
		background-color: #fff;
	}

    &-filter {
        flex: 1;
        text-align: center;
        margin: 5px;
        background-color: #ccc;
        border-radius: 20px;
        color: #666;

        &.opened {
            background-color: #666;
            color: #fff;
        }
    }

	&-filter-cost {
		display: flex;
		width: 100%;
		padding: 10px;
        padding-top: 0;
		background-color: #fff;
		align-items: center;

		input {
			margin-left: 10px;
			flex: 1;
		}
	}

	&-row {
	    display: flex;
		height: 50px;
		border-bottom: 1px solid #ddd;
		background-color: #fff;

		&.left {
			justify-content: flex-start;
		}

		&.right {
			justify-content: flex-end;
		}

	}
}

footer {
    text-align: center;
    line-height: 100px;
    font-size: 25px;
}
</style>
