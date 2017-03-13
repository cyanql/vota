<template>
	<div>
		<h1>玩家昵称：<input v-model="player_id"><button @click="onClick">确认</button></h1>
		<div class="player-row" v-for="player in players">
			<img class="avatar" :src="player.avatarfull" alt="avatar">
			<span class="username">{{player.personaname}}</span>
			<span class="userid">ID:{{player.account_id}}</span>
			<span class="arrow">></span>
		</div>
	</div>
</template>

<script>
import API from 'src/constants/api'

export default {
	data() {
		return {
			player_id: '',
			players: process.env.NODE_ENV === 'development' ? require('src/../.data/players.json') : []
		}
	},
	methods: {
		onClick() {
			API.request(API.search, {query: {q: this.player_id}})
			.then(res => res.json())
			.then(json => {
				this.players = json
			})
		}
	},
}
</script>

<style lang="scss" scoped>
.player-row {
	display: flex;
	align-items: center;
	font-size: 14px;

	.avatar {
		width: 50px;
		border-radius: 50%;
	}

	.username {
		flex: 1;
	}

	.userid {
		width: 120px;
		color: #888;
	}

	.arrow {
		color: #888;
	}

	span {
		padding: 5px;
	}
}
</style>
