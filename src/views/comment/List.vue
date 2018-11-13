<template>
	<div class="comment">
		<Scroll
			:data="comments"
			:pullup="true"
			@pulldup="loadMore"
		>
		<div>
			<div class="link">
				<img v-lazy="musicDetail.picUrl" alt="">
				<dl>
					<dt class="van-ellipsis">耳朵</dt>
					<dd><a href="javascript:;" class="singer">李荣浩</a></dd>
				</dl>
				<i class="iconfont youjiantou"></i>
			</div>
			<div class="cls">
				<h2>精彩评论</h2>
				<ul>
					<li v-for="(item, index) in hotComments" :key="item.time">
						<img class="aut" v-lazy="item.user.avatarUrl" alt="">
						<div class="rg" :class="{'van-hairline--bottom': index !== hotComments.length - 1}">
							<dl>
								<dt>{{item.user.nickname}} <a href="javascript:;">{{item.likedCount}} <i class="iconfont dianzan" :class="{liked: item.liked}"></i></a></dt>
								<dd>{{format_(item.time)}}</dd>
							</dl>
							<p>{{item.content}}</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="cls">
				<h2>全部评论</h2>
				<ul>
					<li v-for="(item, index) in comments" :key="item.time">
						<img class="aut" v-lazy="item.user.avatarUrl" alt="">
						<div class="rg" :class="{'van-hairline--bottom': index !== comments.length - 1}">
							<dl>
								<dt>{{item.user.nickname}} <a href="javascript:;">{{item.likedCount}} <i class="iconfont dianzan" :class="{liked: item.liked}"></i></a></dt>
								<dd>{{format_(item.time)}}</dd>
							</dl>
							<p>{{item.content}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		</Scroll>
	</div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { format } from '@/util'
import Scroll from '@/components/BScroll/Index.vue'
export default {
	components: {
		Scroll
	},
	data () {
		return {
			hotComments: [], // 精彩评论
			comments: [], // 全部评论
			offset: 0, // 搜索结果的偏移（用作分页）
			limit: 20 // 每页数据条数
		}
	},
	computed: {
		...mapState(['musicDetail'])
	},
	created () {
		this.getList()
	},
	methods: {
		...mapMutations(['SET_TITLE']),
		format_ (val) {
			return format(val)
		},
		async getList () {
			const params = {
				urlCode: `CD018`,
				id: this.$route.params.id,
				offset: this.offset
			}
			const res = await this.$axios(params)
			console.log(res)
			this.hotComments = res.hotComments
			this.comments = res.comments
			this.SET_TITLE(`评论${res.total}`)
		},
		// 加载更多
		loadMore () {
			this.offset = this.offset + this.limit
			this.getList()
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
.cls{
	h2{
    height: 0.5rem;padding-left: 0.2rem;font-size: 0.23rem;background-color: #eee;color: #888;line-height: 0.5rem;
  }
	li{
		width: 100vw;padding: 2.5vw 3vw 0;display: flex;justify-content: space-between;
		p{
			line-height: 0.43rem;color: #333;font-size: 0.25rem;margin-top: 0.15rem;
		}

	}
	img.aut{
		width: 8vw;height: 8vw;border-radius: 50%;
	}
	.rg{
		width: 83vw;padding-bottom: 2.5vw;
	}
	dt{
		font-size: 0.23rem;color: #777;
		a{
			float: right;color: #777;
		}
	}
	dd{
		font-size: 0.18rem;color: #aaa;
	}
}
.wrapper{
	overflow:hidden;
	height: calc(100vh - 3rem);
}
</style>
