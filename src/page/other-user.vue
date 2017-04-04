<script>
import { mapState, mapActions } from 'vuex'
import User from './user'

export default {
    mixins: [User],
    methods: {
        ...mapActions(['restore']),
        goBack() {
            this.$router.go(-1)
            console.log('restore')
            setTimeout(() => {
                this.restore()
            }, 100)
        }
    }
}
</script>
