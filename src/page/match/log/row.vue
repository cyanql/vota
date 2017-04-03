<template>
	<div>
		<div class="log-row">
			<figure class="rectangle hero" :style="`background-image: url(${log.heroImage})`"></figure>
			<template v-if="log.type === 'kill'">
				<svg-machete></svg-machete>
				<figure class="rectangle hero" :style="`background-image: url(${log.killsHeroImage})`"></figure>
			</template>
			<template v-if="log.type === 'purchase'">
				<svg-cash></svg-cash>
				<figure class="rectangle item" :style="`background-image: url(${log.itemImage})`"></figure>
			</template>
			<template v-if="log.type === 'rune'">
				<svg-robber></svg-robber>
				<figure class="square rune" :style="`background-image: url(${log.runeImage})`"></figure>
			</template>
		</div>
		<span class="log-info">{{log.time}}</span>
	</div>
</template>

<script>
import svgMachete from 'src/component/svg/machete'
import svgCash from 'src/component/svg/cash'
import svgRobber from 'src/component/svg/robber'

export default {
	props: ['log'],
	components: {
		svgMachete,
		svgCash,
		svgRobber
	}
}
</script>

<style lang="scss" scoped>
.log {
	&-row {
		justify-content: inherit;
		display: flex;
		align-items: center;
		width: 50%;
		padding: 0 10px;
	}

	&-info {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #aaa;
		color: #fff;
		font-size: 10px;
		padding: 2px;
		border-radius: 2px;
	}
}
</style>
