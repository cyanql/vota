<template>
	<div v-if="match">
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: mapState({
		match: state => state.match
	})
}
</script>

<style lang="scss" scoped>

</style>
