<template>
	<div class="d-progress" :class="oClass" :style="oStyle">
		<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
			<path d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" stroke="#eee" fill="none" :stroke-width="strokeWidth" stroke-linecap="round" :stroke-dasharray="length" stroke-dashoffset="0"></path>
			<path class="d-progress-inner" d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" stroke="blue" fill="none" :stroke-width="strokeWidth" stroke-linecap="round" :stroke-dasharray="length" :stroke-dashoffset="(1 - oPercent) * length" :style="circleStyle"></path>
		</svg>
		<span v-if="oStatus === 'active'" class="d-progress-content">{{Math.floor(oPercent * 100) + '%'}}</span>
		<d-icon v-if="oStatus === 'success'" class="d-progress-content" icon="check"></d-icon>
		<d-icon v-if="oStatus === 'error'" class="d-progress-content" icon="close"></d-icon>
	</div>
</template>

<script>
export default {
	name: 'd-progress',
	props:{
		radius: {
			type: Number,
			default: 30
		},
		status: {
			type: String,
			default: 'active'
		},
		strokeWidth: {
			type: Number,
			default: 5
		},
		duration: {
			type: Number,
			default: 500
		},
		percent: {
			type: Number,
			default: 50
		}
	},
	data() {
		return {
			length: 295.416//2 * Math.PI * this.oRadius
		}
	},
	computed: {
		oRadius() {
			return this.radius - this.strokeWidth / 2
		},
		oPercent() {
			let percent = Number(this.percent) / 100
			percent = percent < 1 ? percent : 1
			percent = percent > 0 ? percent : 0
			return percent
		},
		oStatus() {
			return this.oPercent === 1 ? 'success' : this.status
		},
		oClass() {
			return [this.oStatus]
		},
		oStyle() {
			const diameter = this.radius * 2 + 'px'
			return {
				width: diameter,
				height: diameter
			}
		},
		circleStyle() {
			return {
				transitionProperty: 'stroke-dashoffset, stroke',
				transitionDuration: this.duration / 1000 + 's',
				transitionTimingFunction: 'ease'
			}
		}
	}
}
</script>

<style lang="scss">
@import "~src/style/variable";

@mixin color-type($color) {
	.d-progress-inner {
		stroke: $color;
	}
	.d-progress-content {
		color: $color;
	}
}

.d-progress {
	position: relative;
	display: inline-block;

	&.active { @include color-type($blue-8);}
	&.success { @include color-type($green-6);}
	&.error { @include color-type($red-6);}

	&-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 14px + 6px;

		&:not(i) {
			font-size: 14px;
		}
	}
}
</style>
