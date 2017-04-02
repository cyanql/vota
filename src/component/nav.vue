<template lang="html">
    <div class="d-nav">
        <span class="btn left" @click="onLeftClick"><</span>
        <span class="title">{{title}}</span>
        <span class="btn left" @click="onRightClick"></span>
    </div>
</template>

<script>
export default {
    name: 'd-nav',
    props: {
        title: [String, Number]
    },
    methods: {
        onLeftClick() {
            this.$emit('left-click')
        },
        onRightClick() {
            this.$emit('right-click')
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~src/style/variable";

.d-nav {
    height: 35px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: white;
    background-color: $status-bar-bgcolor;
    justify-content: space-between;
}

.btn {
    display: flex;
    align-items: center;
    width: 30px;
    height: 30px;
    line-height: 1;
    padding: 10px;
}
</style>
