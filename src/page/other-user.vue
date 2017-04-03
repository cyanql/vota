<script>
import { mapState, mapActions } from 'vuex'
import User from './user'

export default {
    mixins: [User],
    methods: {
        ...mapActions(['restore']),
        goBack() {
            this.$router.go(-1)
            setTimeout(() => {
                this.restore()
            }, 1)
        }
    }
}
</script>
