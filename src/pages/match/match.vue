<template>
	<div class="box-view">
		<nav>
			<router-link v-for="link in links" replace :key="link" :to="link.name" class="nav-item" :class="link.name === $route.name && 'selected'">{{link.title}}</router-link>
		</nav>
		<slide-transition>
			<router-view class="content scroll-view"></router-view>
		</slide-transition>
	</div>
</template>
<script>
import slideTransition from 'src/component/slide-transition'

export default {
	data() {
		return {
			links: [{
				name: 'summary',
				title: '比赛概况'
			}
			/*, {
				name: 'detail',
				title: '数据详情'
			}, {
				name: 'trend',
				title: '趋势'
			}
			*/, {
				name: 'log',
				title: '日志'
			}]
		}
	},
	components: {
		slideTransition
	}
}
</script>

<style lang="scss" scoped>
nav {
	display: flex;
	background-color: #333;
	color: #fff;
	height: 30px;

	.nav-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
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

.content {
	padding: 10px 0;
}
</style>
