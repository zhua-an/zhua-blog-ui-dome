<template>
    <div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'authredirect',
    components: {
    },
    data() {
        return {
        }
    },
	computed: {
        ...mapGetters(['website'])
	},
    mounted() {
    },
    created() {
        const params = this.$route.query
        const state = params.state
        const code = params.code
        if(code && window.opener.location) {
            let c = '?'
            if(window.opener.location.href.indexOf('?') != -1) {
                c = '&'
            }
            window.opener.location.href = `${window.opener.location.href}${c}code=${code}&state=${state}`
            window.close()
        } else {
            if(window.opener) {
                window.close()
            }else {
                this.$alert('去博客首页看看吧~', '消息', {
                    showClose: false,
                    confirmButtonText: '确定',
                    callback: () => {
                        window.location.href = `${window.location.origin}/#${this.website.homePage}`
                    }
                })
            }
        }
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>

</style>