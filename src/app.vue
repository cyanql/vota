<template>
	<div class="container">
		<slide-transition :direction="transitionDirection">
			<router-view></router-view>
		</slide-transition>
		<div class="floating-btn" @click="redirectHome">
			<svg-home></svg-home>
		</div>
	</div>
</template>
<script>
import svgHome from 'src/component/svg/home'
import slideTransition from 'src/component/slide-transition'

const PAGE_INDEX = {
	home: 1,
	userinfo: 2
}

export default {
	data() {
		return {
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
	methods: {
		redirectHome() {
			this.$router.push('/home')
		}
	},
	components: {
		slideTransition,
		svgHome
	},
	created() {
		this.$store.dispatch('loadLocalData')
	}
}

</script>

<style lang="scss" scoped>
.floating-btn {
    position: absolute;
    display: flex;
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    justify-content: center;
    background-color: rgba(0,0,0,.65);
    align-items: center;
    border-radius: 50%;
}
</style>
