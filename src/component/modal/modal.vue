<template>
    <transition name="modal">
        <div class="c-modal" v-show="visible">
    		<div class="c-modal-mask"></div>
    		<div class="c-modal-inner">
    			<span v-if="type === TYPE.TOAST">{{text}}</span>
                <d-progress v-if="type === TYPE.PROGRESS" :percent="percent" :status="status"></d-progress>
                <d-spin v-if="type === TYPE.LOADING" :loading="loading"></d-spin>
    		</div>
    	</div>
    </transition>
</template>

<script>

const TYPE = {
    TOAST: 1,
    LOADING: 2,
    PROGRESS: 3
}

const initState = {
    text: '',

    loading: false,

    percent: 0,
    status: 'active'
}

export default {
	name: 'd-modal',
	data() {
		return {
            TYPE,
            type: TYPE.TOAST,
            visible: false,
            ...initState
		}
	},
	methods: {
        open() {
            this.visible = true
        },
        close() {
            this.visible = false
            Object.assign(this, initState)
        },
		lazyClose() {
            setTimeout(() => {
                this.close()
            }, 2000)
		},
        toast(text) {
            this.type = TYPE.TOAST
            this.text = text
            this.open()
            this.lazyClose()
        },
        spin(loading) {
            this.type = TYPE.LOADING
            if (loading) {
                this.loading = true
                this.open()
            } else {
                this.close()
            }
        },
        progress(percent) {
            this.type = TYPE.PROGRESS
            this.open()
            if (percent === false) {
                this.status = 'error'
                this.lazyClose()
            } else if (percent === true) {
                this.status = 'success'
                this.lazyClose()
            } else {
                this.percent = percent
            }
        }
	}
}
</script>

<style lang="scss">
$zindex-modal: 1050;
$model-mask-bg-color: rgba(0,0,0,.5);
$model-width: 150px;
$model-padding: 20px;
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

	&-inner {
		display: inline-block;
		vertical-align: middle;
		text-align: center;
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
	}

	&-enter,
	&-leave-active {
		opacity: 0;
	}
}
</style>
