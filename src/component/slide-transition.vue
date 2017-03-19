<template>
	<transition name="slide">
		<slot></slot>
	</transition>
</template>

<style lang="scss">

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
