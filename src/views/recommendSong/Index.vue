<template>
	<div>
		<div class="info">
			<img src="http://p1.music.126.net/OA4Ss5eWp7B7TjeBKZXB5g==/109951163647947761.jpg">
		</div>
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
<style lang="scss" scoped>
.info{
	width: 100vw;max-height: 30vh;
	img{
		width: 100%;height: 100%;
	}
}
</style>

