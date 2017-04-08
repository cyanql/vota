<template>
    <div class="user-row" @click="onClick">
        <d-avator circle :src="userProfile.avatarfull"></d-avator>
        <span class="username">{{userProfile.personaname}}</span>
        <span class="userid">{{userProfile.account_id}}</span>
        <span class="arrow"><d-icon icon="right"></d-icon></span>
    </div>
</template>

<script>
export default {
    props: ['userProfile'],
    methods: {
        onClick(e) {
            this.$emit('click', e)
        }
    }
}
</script>

<style lang="scss" scoped>

.user-row {
	font-size: 14px;
    height: 50px;
}

.username {
    flex: 1;
    padding: 10px;
}

.userid {
    padding-right: 10px;
    font-size: 12px;
}

.userid,
.arrow {
    color: #888;
    padding: 5px;
}
</style>
