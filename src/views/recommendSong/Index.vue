<template>
	<div>
		<List :trackCount="5" :list="recommend"></List>
	</div>
</template>
<script>
import List from './List'
import { mapMutations } from 'vuex'
export default {
	components: {
		List
	},
	data() {
		return {
			recommend: []
		}
	},
	created () {
		this.getsong()
	},
	methods: {
		...mapMutations({
			setLoad: 'SET_LOAD'
		}),
		async getsong () {
			const res = await this.$axios({
				urlCode: 'CD013'
			})
			this.setLoad(false)
			this.recommend = res.recommend
			console.log(this.recommend)
		}
	}
}
</script>