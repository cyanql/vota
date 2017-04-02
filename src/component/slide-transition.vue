<template>
	<transition :name="name">
		<slot></slot>
	</transition>
</template>

<script>
export default {
    name: 'slide-transition',
	props: {
		direction: {
			type: String,
			default: 'left'
		}
	},
	computed: {
		name() {
			return 'slide-' + this.direction
		}
	}
}
</script>

<style lang="scss">

.slide {
	&-left-enter-active,
	&-left-leave-active,
	&-right-enter-active,
	&-right-leave-active, {
		transition-property: opacity, transform;
		transition-duration: .5s;
		transition-timing-function: cubic-bezier(.55,0,.1,1);
		animation-fill-mode: both;
		backface-visibility: hidden;
  		will-change: transform;
	}

	&-left-enter,
	&-right-leave-active {
		opacity: 0;
		transform: translate(100%, 0);
	}

	&-right-enter,
	&-left-leave-active {
		opacity: 0;
		transform: translate(-100%, 0);
	}
}
</style>
