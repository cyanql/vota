<template lang="html">
    <div class="d-scroller" ref="scroller">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'd-scroller',
    props: {
        lazyNumber: {
            type: Number,
            default: 3
        }
    },
    mounted() {
        const el = this.$refs.scroller

        el.addEventListener('touchstart', (e) => {
            el.allowUp = el.scrollTop > 0
            el.allowDown = el.scrollTop < el.scrollHeight - el.clientHeight
            el.startY = e.pageY
        })

        el.addEventListener('touchmove', (e) => {
            if (e.pageY > el.startY && el.allowUp || e.pageY < el.startY && el.allowDown) {
                e.stopPropagation()
            } else {
                e.preventDefault()
            }
            el.startY = e.pageY
        })

        let scrollDistance = 0
        el.addEventListener('scroll', (e) => {
            if (el.scrollTop > el.scrollHeight - el.clientHeight * this.lazyNumber && el.scrollTop > scrollDistance) {
                scrollDistance = el.scrollTop
                this.$emit('lazy', e)
            }
        })
    },
}
</script>

<style lang="scss">
.d-scroller {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>
