<template lang="html">
    <div class="d-card">
        <div class="d-card-header">
			<span class="d-card-title">
                <d-icon v-if="icon" :icon="icon"></d-icon>
                <span class="d-card-title-text">{{title}}</span>
            </span>
			<span class="d-card-btn-group" v-if="$slots.button">
			    <slot name="button"></slot>
			</span>
        </div>
        <div class="d-card-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'd-card',
    props: {
        icon: String,
        title: String
    }
}
</script>

<style lang="scss">
.d-card {
    &-header {
    	display: flex;
    	justify-content: space-between;
    	padding: 10px;
        font-size: 12px;
    }

    &-title {
        display: flex;
        align-items: center;

        &-text {
            padding-left: 5px;
        }
    }

    &-btn-group {
        opacity: .5;
        border: 1px solid rgba(0,0,0,.1);
        padding: 0 5px;
        border-radius: 100px;
    }

    &-content {
        position: relative;
        z-index: 1;
        background-color: #fff;
        box-shadow: 0 0 1px rgba(0,0,0,.1);
    }
}
</style>
