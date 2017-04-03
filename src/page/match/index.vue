<template>
    <d-container>
        <d-nav :title="match.match_id" @left-click="goBack"></d-nav>
		<nav>
			<router-link v-for="link in links" replace :key="link" :to="link.name" class="nav-item" :class="link.name === $route.name && 'selected'">{{link.title}}</router-link>
		</nav>
        <div>
    		<slide-transition :direction="transitionDirection">
    			<router-view class="overflow-view"></router-view>
    		</slide-transition>
        </div>
	</d-container>
</template>
<script>
import { mapState } from 'vuex'
const PAGE_INDEX = {
	summary: 1,
	detail: 2,
	log: 3
}

export default {
	data() {
		return {
			links: [{
				name: 'summary',
				title: '概况'
			}, {
				name: 'detail',
				title: '图表'
			},
			// {
			// 	name: 'trend',
			// 	title: '趋势'
			// },
			{
				name: 'log',
				title: '日志'
			}],
			transitionDirection: 'left'
		}
	},
	watch: {
		$route(to, from) {
			const toArr = to.path.split('/')
			const fromArr = from.path.split('/')
			if (toArr.length === fromArr.length) {
				this.transitionDirection = PAGE_INDEX[toArr.pop()] < PAGE_INDEX[fromArr.pop()] ? 'right' : 'left'
			} else {
				this.transitionDirection = toArr.length < fromArr.length ? 'right' : 'left'
			}
		}
	},
    computed: mapState({
        match: state => state.match
    }),
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~src/style/variable";

$nav-bar-height: 35px;

nav {
	display: flex;
	background-color: $status-bar-bgcolor;
	color: #fff;

	.nav-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
    	height: $nav-bar-height;
		opacity: .5;

		&.selected {
			position: relative;
			opacity: 1;

			&:after {
				position: absolute;
			    content: '';
			    width: 0;
			    height: 0;
			    bottom: 0;
			    left: 50%;
			    margin-left: -5px;
			    border: 5px solid transparent;
			    border-bottom: 5px solid white;
			}
		}
	}
}

.overflow-view {
	position: absolute;
    top: $nav-bar-height + 35px;
    right: 0;
    bottom: 0;
	left: 0;
	width: 100%;
	overflow-x: hidden;
	overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>
