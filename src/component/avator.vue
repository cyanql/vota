<template>
    <img class="d-avator" :class="classes" :src="src" :alt="alt">
</template>
<script>
export default {
    name: 'd-avator',
    props: {
        src: String,
        alt: String,
        circle: Boolean,
    },
    computed: {
        classes() {
            return {
                circle: this.circle
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.d-avator {
    height: 30px;

    &.circle {
        border-radius: 50px;
    }
}
</style>
