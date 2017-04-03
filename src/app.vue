<template>
	<div>
        <div class="status-bar-placeholder" v-if="fullscreen"></div>
		<slide-transition :direction="transitionDirection">
			<router-view :class="fullscreen && 'fullscreen'"></router-view>
		</slide-transition>
		<div class="floating-btn" @click="redirectHome">
			<svg-home></svg-home>
		</div>
	</div>
</template>
<script>
import svgHome from 'src/component/svg/home'
import { mapState } from 'vuex'

const PAGE_INDEX = {
	home: 1,
	user: 2
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
    computed: mapState({
        fullscreen: state => state.status.fullscreen
    }),
	methods: {
		redirectHome() {
			this.$router.push('/home')
		},
        goBack() {
            this.$router.go(-1)
        }
	},
	components: {
		svgHome
	},
	created() {
		this.$store.dispatch('loadLocalData')
	}
}

</script>

<style lang="scss" scoped>
@import "~src/style/variable";

.floating-btn {
    position: fixed;
    display: flex;
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    justify-content: center;
    background-color: rgba(0,0,0,.65);
    align-items: center;
    border-radius: 50%;
    z-index: 1000;
}

.status-bar-placeholder {
    height: 20px;
    background-color: $status-bar-bgcolor;
}

.fullscreen {
    margin-top: 20px;
}
</style>
