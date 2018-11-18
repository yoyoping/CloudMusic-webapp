<template>
  <div class="send">
		<form action=""  @submit.prevent="comment">
			<!-- <input type="text" placeholder="随乐而起，有感而发"> -->
			<van-field
				v-model="content"
				type="textarea"
				placeholder="随乐而起，有感而发"
				rows="1"
				class="ipt"
				:autosize="{ maxHeight: 50, minHeight: 20 }"
			/>
		</form>
		<i class="iconfont fasong" @click="comment"></i>
	</div>
</template>
<script>
import { Field, Toast } from 'vant'
import Cookies from "js-cookie"
export default {
	components: {
		[Field.name]: Field,
		[Toast.name]: Toast
	},
	data () {
		return {
			content: '' // 留言内容
		}
	},
	methods: {
		/**
		 * 发送评论
		 */
		async comment () {
			if (!this.content.trim()) {
				Toast.fail('内容不能为空')
				return
			}
			if (!Cookies.get('loginStatus')) {
				Toast.fail('请先登录！')
				return
			}
			const params = {
				urlCode: 'CD019',
				t: 1,
				type: 0,
				id: this.$route.params.id,
				content: this.content
			}
			const res = await this.$axios(params)
			this.content = ''
			Toast.success('评论成功')
			this.$emit('comment')
		}
	}
}
</script>

<style lang="scss" scoped>
.send{
	width: 100vw;min-height: 0.9rem;background-color: #fff;padding: 0.15rem 3vw;position: fixed;
	left: 0;bottom: 0;border-top: 0.01rem solid #ccc;overflow: hidden;display: flex;align-items:center;
	.ipt{
		width: 83vw;float: left;border: 0.01rem solid #ccc;border-radius: 0.3rem;
		padding:  0.04rem 0.2rem;outline: none;
	}
	i{
		font-size: 0.4rem;float: right;padding: 0.1rem 4vw;color: #2d8cf0;
	}
}
</style>
