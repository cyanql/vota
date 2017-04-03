<template>
	<d-container>
        <div class="search-bar">
            <input type="text" class="search-inner" placeholder="昵称 或者 id" :value="username" @input="changeUserName($event.target.value)"  @keyup.enter="getUsersFetch(username)">
        </div>
		<d-scroller @lazy="onLazy">
            <d-card title="结果" icon="similar">
                <div class="list">
                    <user-row class="list-item" v-for="(user, index) in users" v-show="index < limit" :key="user.userid" :user="user" @click="getMatchesFetch(user)"></user-row>
                </div>
            </d-card>
            <d-card title="历史搜索记录" icon="explore">
                <span slot="button" @click="removeLocalData('usernames')">
                    <d-icon icon="delete_light"></d-icon>
                    <span>清空</span>
                </span>
    			<div class="list">
                    <user-row class="list-item" v-for="user in historyUsers" :key="user.userid" :user="user" @click="getMatchesFetch(user)"></user-row>
    			</div>
            </d-card>
		</d-scroller>
	</d-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserRow from './user-row.vue'

export default {
    data() {
        return {
            limit: 20
        }
    },
	computed: mapState({
		historyUsers: state => state.status.history.users,
		username: state => state.status.username,
		users: state => state.users
	}),
	methods: {
		...mapActions([
			'auth',
			'changeUserName',
			'getUsersFetch',
			'getMatchesFetch',
			'removeLocalData'
		]),
        onLazy() {
            this.limit += 20
        }
	},
	created() {
		this.auth()
	},
    components: {
        userRow: UserRow
    }
}
</script>

<style lang="scss" scoped>
@import "~src/style/variable";

.search {
    &-bar {
        padding: 10px;
        background-color: $status-bar-bgcolor;
    }

    &-inner {
        width: 100%;
        text-align: center;
    }
}
</style>
