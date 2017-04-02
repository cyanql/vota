<template lang="html">
    <div class="d-container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'd-container'
}
</script>

<style lang="scss">
.d-container {
	position: absolute;
    top: 0;
	left: 0;
	right: 0;
    bottom: 0;
	width: 100%;
	display: flex;
	flex-direction: column;
    background-color: #eee;
}
</style>
