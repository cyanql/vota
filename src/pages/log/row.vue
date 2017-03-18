<template>
	<div>
		<div class="log-row">
			<figure class="hero" :style="`background-image: url(${log.hero_img})`"></figure>
			<template v-if="log.type === 'kill'">
				<svg-machete></svg-machete>
				<figure class="hero" :style="`background-image: url(${log.kills_hero_img})`"></figure>
			</template>
			<template v-if="log.type === 'purchase'">
				<svg-cash></svg-cash>
				<figure class="item" :style="`background-image: url(${log.item_img})`"></figure>
			</template>
			<template v-if="log.type === 'rune'">
				<svg-robber></svg-robber>
				<figure class="rune" :style="`background-image: url(${log.rune_img})`"></figure>
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
