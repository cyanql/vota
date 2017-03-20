<template>
	<transition name="modal" @enter="enter">
		<div class="c-modal" v-show="visibleState">
			<div class="c-modal-mask" @click="onClose"></div>
			<div class="c-modal-container" ref="cModalContainer">
				<slot></slot>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'c-modal',
	props: {
		visible: Boolean,
		title: String,
		maskClosable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			visibleState: this.visible,
			triggerEl: null
		}
	},
	watch: {
		visible(val) {
			this.visibleState = val
		},
		visibleState(val) {
			val ? this.$emit('open', val) : this.$emit('close', val)
			this.$emit('toggle', val)
		}
	},
	methods: {
		updateTriggerEl(e) {
			this.triggerEl = e.target
		},
		enter(el) {
			let containerEl, triggerRect, x, y

			containerEl = this.$refs.cModalContainer

			if (this.triggerEl) {
				triggerRect = this.triggerEl.getBoundingClientRect()

				x = triggerRect.left - containerEl.offsetLeft + 'px'
				y = triggerRect.top - containerEl.offsetTop + 'px'
			}

			containerEl.style.transformOrigin = [x, y].join(' ')
		},
		onClose() {
			if (this.maskClosable) {
				this.visibleState = false
			}
		}
	},
	mounted() {
		document.addEventListener('mousedown', this.updateTriggerEl)
	},
	beforeDestroy() {
		document.removeEventListener('mousedown', this.updateTriggerEl)
	}
}
</script>

<style lang="scss">
@import "~src/styles/variables";

$zindex-modal: 1050;
$model-mask-bg-color: rgba(0,0,0,.5);
$model-width: 300px;
$model-padding: 10px;
$model-border-radius: 3px;
$model-box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2);

.c-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	text-align: center;
	z-index: $zindex-modal;

	&:before {
		content: "";
		display: inline-block;
		width: 0;
		height: 100%;
		vertical-align: middle;
	}

	&-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: $model-mask-bg-color;
		z-index: -1;
	}

	&-container {
		display: inline-block;
		vertical-align: middle;
		text-align: left;
		width: $model-width;
		padding: $model-padding;
		border-radius: $model-border-radius;
		background-color: #fff;
		box-shadow: $model-box-shadow;
	}
}

.modal {
	&-enter-active,
	&-leave-active {
		transition: opacity .2s ease;

		.c-modal-container {
			transition: transform .2s ease;//, opacity .2s ease-out;
		}
	}

	&-enter,
	&-leave-active {
		opacity: 0;

		.c-modal-container {
			transform: scale(.2);
		}
	}
}
</style>
