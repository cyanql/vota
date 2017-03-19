<template>
	<dd class="player-row">
		<figure class="avator">
			<img :src="player.hero_img" alt="">
			<span class="level">{{player.level}}</span>
		</figure>
		<div class="info">
			<div class="left">
				<p class="username">{{player.personaname || '佚名'}}</p>
				<p>参战率：{{player.fight_ratio}}</p>
				<p>伤害：{{player.demage_per}}</p>
			</div>
			<div class="right">
				<p>{{[player.kills, player.deaths, player.assists].join('/')}}</p>
				<p>XPM：{{player.xp_per_min}}</p>
				<p>GPM：{{player.gold_per_min}}</p>
			</div>
		</div>
		<div class="items">
			<ul>
				<li><img :src="player.item_0" alt=""></li>
				<li><img :src="player.item_1" alt=""></li>
				<li><img :src="player.item_2" alt=""></li>
			</ul>
			<ul>
				<li><img :src="player.item_3" alt=""></li>
				<li><img :src="player.item_4" alt=""></li>
				<li><img :src="player.item_5" alt=""></li>
			</ul>
		</div>
	</dd>
</template>
<script>
export default {
	props: ['player']
}
</script>

<style lang="scss">

.player-row {
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgba(0,0,0,.1);
	padding: 5px 10px;
	font-size: 9px;

	.avator {
		position: relative;

		img {
			width: 60px;
			vertical-align: bottom;
		}

		.level {
			position: absolute;
			right: 0;
			bottom: 0;
			color: white;
			background-color: rgba(0,0,0,.5);
		}
	}

	.info {
		display: flex;
		padding: 0 10px;
		flex: 1;
		align-items: center;

		.username {
			font-size: 14px;
			color: #b21;
		}

		.left {
			flex: 1
		}

		.right {
			text-align: right;
		}
	}

	.items {
		ul > li {
			display: inline-block;
		}

		img {
			width: 20px;
			margin: 1px 0;
			vertical-align: bottom;
		}
	}
}
</style>
