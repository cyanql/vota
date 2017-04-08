<template>
	<d-container>
        <div class="search-bar">
            <input type="text" class="search-inner" placeholder="昵称 或者 id" :value="username" @input="changeUserName($event.target.value)"  @keyup.enter="inputEnter(username)">
        </div>
		<d-scroller @lazy="onLazy">
            <d-card title="结果" icon="similar">
                <div class="list">
                    <user-row class="list-item" v-for="(userProfile, index) in userProfiles" v-show="index < limit" :key="userProfile.account_id" :user-profile="userProfile" @click="itemClick(userProfile.account_id)"></user-row>
                </div>
            </d-card>
            <d-card title="历史搜索记录" icon="explore">
                <span slot="button" @click="removeLocalData('usernames')">
                    <d-icon icon="delete_light"></d-icon>
                    <span>清空</span>
                </span>
    			<div class="list">
                    <user-row class="list-item" v-for="user in historyUsers" :key="user.profile.account_id" :user-profile="user.profile" @click="itemClick(user.profile.account_id)"></user-row>
    			</div>
            </d-card>
		</d-scroller>
	</d-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserRow from './user-row.vue'
import M from 'src/component/modal'

export default {
    data() {
        return {
            limit: 20
        }
    },
	computed: mapState({
		historyUsers: state => state.status.history.users,
		username: state => state.status.username,
		userProfiles: state => state.userProfiles
	}),
	methods: {
		...mapActions([
			'auth',
            'getUserFetch',
			'changeUserName',
			'searchUsersFetch',
			'getMatchesFetch',
			'removeLocalData'
		]),
        onLazy() {
            this.limit += 20
        },
        async inputEnter(nameOrId) {
            M.spin(true)
            try {
                if (/^\d+$/.test(nameOrId)) {
                    await this.getUserFetch(nameOrId)
                	this.$router.push('/user')
                } else {
                    await this.searchUsersFetch(nameOrId)
                }
            } catch(ignore) {}
            M.spin(false)
        },
        async itemClick(userid) {
            if (!userid) {
                return alert('用户资料未公开')
            }
            M.spin(true)
            try {
                await this.getUserFetch(userid)
                await this.getMatchesFetch(userid)
            	this.$router.push('/user')
            } catch(ignore) {}
            M.spin(false)
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
