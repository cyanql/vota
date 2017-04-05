<template>
	<div class="d-spin" :class="loadingClass" :style="oStyle"></div>
</template>

<script>
export default {
	name: 'd-spin',
	props:{
		radius: {
			type: Number,
			default: 25
		},
		loading: {
			type: Boolean,
			default: true
		},
		text: String
	},
	computed: {
		oStyle() {
			const diameter = this.radius * 2
			return {
				width: diameter + 'px',
				height: diameter + 'px',
				borderWidth: diameter / 10 + 'px'
			}
		},
		loadingClass() {
			return {
				loading: this.loading
			}
		}
	}

}
</script>

<style lang="scss">
@import "~src/style/variable";

/**
 * 引用 https://projects.lukehaas.me/css-loaders/
 */
.d-spin {
	position: relative;
	display: inline-block;
	width: 20px;
	height: 20px;
	border: 3px solid transparent;
	border-left-color: $blue-6;
	border-radius: 50%;
	transform: translateZ(0);
	vertical-align: middle;

	&.loading {
		animation: spinload 1s infinite linear;
	}
}

@keyframes spinload {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
