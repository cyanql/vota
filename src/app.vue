<template>
	<div>
		<nav v-show="navVisible">
			<router-link v-for="link in links" :key="link" :to="link.name" class="nav-item" :class="link.name === $route.name && 'selected'">{{link.title}}</router-link>
		</nav>
		<transition name="slide">
			<router-view class="content"></router-view>
		</transition>
	</div>
</template>
<script>
export default {
	data() {
		return {
      		transitionName: 'slide-left',
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
	computed: {
		navVisible() {
			return ['summary', 'detail', 'trend', 'log'].indexOf(this.$route.name) > -1
		}
	}
}

</script>

<style lang="scss" scoped>
nav {
	display: flex;
	background-color: #333;
	color: #fff;

	.nav-item {
		flex: 1;
		line-height: 35px;
		text-align: center;
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

.slide {
	&-enter-active,
	&-leave-active, {
		transition-property: opacity, transform;
		transition-duration: .3s;
		transition-timing-function: cubic-bezier(.55,0,.1,1);
	}

	&-enter-active {
		transition-delay: .25s;
	}

	&-enter {
		opacity: 0;
		transform: translate(0, 100px);
	}

	&-leave-active {
		opacity: 0;
		transform: translate(0, 100px);
	}
}
</style>
