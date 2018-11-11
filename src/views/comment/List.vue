<template>
	<div class="comment">
		<router-link to="/">点击</router-link>
	</div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
	created () {
		this.getList()
	},
	methods: {
		...mapMutations(['SET_TITLE']),
		async getList () {
			const params = {
				urlCode: `CD018`,
				id: this.$route.params.id
			}
			const res = await this.$axios(params)
			this.SET_TITLE(`评论${res.total}`)
		}
	},
	beforeRouteLeave (to, from, next) {
		this.SET_TITLE(false)
		next()
	}
}
</script>

<style lang="scss" scoped>

</style>
