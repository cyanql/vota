<template>
    <div class="user-row" @click="onClick">
        <d-avator circle :src="user.avatarfull"></d-avator>
        <span class="username">{{user.personaname}}</span>
        <span class="userid">{{user.account_id}}</span>
        <span class="arrow">></span>
    </div>
</template>

<script>
export default {
    props: ['user'],
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
