<template>
	<div>
		<List :trackCount="5" :list="recommend"></List>
	</div>
</template>
<script>
import List from '@/components/list/Index'
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
		async getsong () {
			const res = await this.$axios({
				url: 'recommendSong'
			})
			this.recommend = res.recommend
			console.log(this.recommend)
		}
	}
}
</script>