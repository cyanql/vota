<template>
	<i class="d-icon iconfont" :class="oSelf.classes" :style="oSelf.styles" @click="onClick"></i>
</template>

<script>
export default {
	name: 'd-icon',
	props: {
		icon: {
			type: String,
			required: true
		},
		color: {
			type: String,
			default: 'default'
		}
	},
	computed: {
		oSelf() {
			const { color, icon } = this
			const styles = {}
			let colorClass

			// 当使用16进制颜色时，背景默认为transparent
			if (color.indexOf('#') > -1) {
				styles.color = color
			} else {
				colorClass = color
			}

			return {
				styles,
				classes: [colorClass, 'icon-' + icon]
			}
		}
	},
	methods: {
		onClick(e) {
			this.$emit('click', e)
		}
	}
}

</script>
<style lang="scss">
@import "~src/style/variable";
@import url(~src/font/iconfont.css);

.d-icon {
    font-size: 12px;
	font-weight: normal;
	font-style: normal;
	display: inline-block;
	// line-height: 1;
	text-transform: none;
	letter-spacing: normal;
	word-wrap: normal;
	white-space: nowrap;
	direction: ltr;

	/* Support for all WebKit browsers. */
	-webkit-font-smoothing: antialiased;
	/* Support for Safari and Chrome. */
	text-rendering: optimizeLegibility;

	/* Support for Firefox. */
	-moz-osx-font-smoothing: grayscale;

	/* Support for IE. */
	font-feature-settings: 'liga';

	vertical-align: bottom;

	&.default {color: inherit;}
	&.primary {color: $blue-6;}
	&.success {color: $green-6;}
	&.warning {color: $orange-6;}
	&.error {color: $red-6;}
}
</style>
