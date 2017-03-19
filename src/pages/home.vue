<template>
	<div class="box-view">
		<h1>玩家昵称：<input :value="username" @input="changeUserName($event.target.value)"><button @click="getUsersFetch(username)">确认</button></h1>
		<div class="scroll-view">
			<div class="player-row" v-for="user in users" @click="getMatchesFetch(user)">
				<img class="avatar" :src="user.avatarfull" alt="avatar">
				<span class="username">{{user.personaname}}</span>
				<span class="userid">ID:{{user.account_id}}</span>
				<span class="arrow">></span>
			</div>
			<dl class="history">
				<dt>
					<span>历史搜索记录</span>
					<span class="btn" @click="removeLocalData('usernames')">清空</span>
				</dt>
				<dd class="player-row" v-for="user in historyUsers" @click="getMatchesFetch(user)">
					<img class="avatar" :src="user.avatarfull" alt="avatar">
					<span class="username">{{user.personaname}}</span>
					<span class="userid">ID:{{user.account_id}}</span>
					<span class="arrow">></span>
				</dd>
			</dl>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	computed: mapState({
		historyUsers: state => state.status.history.users,
		username: state => state.status.username,
		users: state => state.users
	}),
	methods: {
		...mapActions([
			'changeUserName',
			'getUsersFetch',
			'getMatchesFetch',
			'removeLocalData'
		])
	}
}
</script>

<style lang="scss" scoped>

.history {
	dt {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		background-color: #ddd;

		.btn {
			opacity: .5;
		}
	}

	dd {
		padding: 10px;
		border-bottom: 1px solid #ddd;
	}
}

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
