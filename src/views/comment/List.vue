<template>
	<div class="comment">
		<div class="link">
			<img v-lazy="musicDetail.picUrl" alt="">
			<dl>
				<dt class="van-ellipsis">耳朵</dt>
				<dd><a href="javascript:;" class="singer">李荣浩</a></dd>
			</dl>
			<i class="iconfont youjiantou"></i>
		</div>
	</div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
	computed: {
		...mapState(['musicDetail'])
	},
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
			console.log(res)
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
.link{
	height: 26vw;padding: 3vw;display: flex;
	img{
		width: 20vw;height: 20vw;border-radius: 0.1rem;justify-content: flex-start;
	}
	dl{
		width: 68vw;padding: 0 6vw 0 4vw;
	}
	dt{
		padding: 0.28rem 0 0.2rem;font-size: 0.3rem;
	}
	dd{
		font-size: 0.16rem;
	}
	.singer{
		color: cadetblue;
	}
	.iconfont{
		font-size: 0.5rem;line-height: 19vw;color: #ddd;
	}
}
</style>
