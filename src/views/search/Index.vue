<template>
  <div class="searchCon">
		<header>
			<h1>
				<form action="" @submit.prevent="search(false)">
					<input type="search" ref="search" autocomplete="off" class="field placeholder" :placeholder="placeholder" v-model="keywords">
				</form>
				<i class="iconfont guanbi" @click="keywords = ''" v-show="keywords"></i>
			</h1>
			<span class="searchBtn" @click="search" v-show="!isSearch">搜索</span>
			<span class="searchBtn" @click="isSearch = false" v-show="isSearch">取消</span>
		</header>
		<van-loading class="customize" color="#d44439" v-show="loading" />
		<div class="recordCls van-hairline--bottom" v-show="!isSearch && !loading">
			<h2>热门搜索</h2>
			<ul class="clearfix">
				<li v-for="(item, index) in hotList" :key="index" @click="hotSearch(item.first)">{{item.first}}</li>
			</ul>
		</div>
		<div class="recordCls van-hairline--bottom" v-show="!isSearch && searches_list.length && !loading">
			<h2>搜索记录</h2>
			<ul class="clearfix">
				<li v-for="(item, index) in searches_list" :key="index" @click="hotSearch(item)">{{item}}</li>
			</ul>
		</div>
		<div v-show="isSearch">
			<van-tabs class="tabs" @click="changeTab">
				<van-tab title="单曲">
					<scroll
						:data="dataList"
						:pullup="true"
						@pulldup="loadMore">
						<Single :list="dataList" :resultLoing="resultLoing"></Single>
					</scroll>
				</van-tab>
				<van-tab title="视频">
					视频
				</van-tab>
				<van-tab title="歌手">
					歌手
				</van-tab>
				<van-tab title="专辑">
					专辑
				</van-tab>
				<van-tab title="歌单">
					歌单
				</van-tab>
				<van-tab title="主播电台">
					主播电台
				</van-tab>
			</van-tabs>
		</div>
	</div>
</template>
<script>
import { Tab, Tabs, Loading } from 'vant'
import Single from './Single'
// import BScroll from 'better-scroll'
import scroll from '@/components/BScroll/Index.vue'
import { saveSearch } from '@/util/cache'
import storage from 'good-storage'
export default {
	components: {
		[Tab.name]: Tab,
		[Tabs.name]: Tabs,
		Single,
		[Loading.name]: Loading,
		scroll
	},
	data () {
		return {
			placeholder: '',
			searchType: 1, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
			keywords: '',
			hotList: [], // 热搜
			tabArr: [1, 1014, 100, 10, 1000, 1009],
			dataList: [],
			searches_list: [], // 搜索历史
			isSearch: false, // 是否在搜索（true：不显示热搜和搜索历史，显示结果列表）
			loading: true, // 热搜的加载中
			resultLoing: true, // 搜索结果的加载中
			limit: 30, // 每页数据条数
			offset: 0, // 搜索结果的偏移（用作分页）
			prevOffset: '' // 上一次搜索的关键词
		}
	},
	created () {
		this.searchHot()
		this.initHistory()
	},
	mounted() {
	},
	methods: {
		/**
		 * 热搜列表
		 */
		async searchHot () {
			const params = {
				urlCode: 'CD015'
			}
			const res = await this.$axios(params)
			this.hotList = res.result.hots
			this.placeholder = this.hotList[0].first
			this.loading = false
		},
		/**
		 * 热门搜索
		 * keywords 关键字
		 */
		hotSearch (keywords) {
			this.keywords = keywords
			this.search(false)
		},
		/**
		 * 搜索
		 * type: true-加载更多 false-普通搜索
		 */
		async search (type) {
			this.isSearch = true
			// 失去焦点
			this.$refs.search.blur()
			// 保存搜索记录
			saveSearch(this.keywords)
			this.initHistory()
			// 如果没有输入关键字，则将热门搜索第一个做为关键词搜索
			this.keywords = this.keywords ? this.keywords : this.hotList[0].first
			// 每次搜索都将加载中状态改为true并将之前搜索结果清空
			if (!type) {
				this.dataList = []
				this.resultLoing = true
				this.offset = 0
			}
			const params = {
				urlCode: 'CD016',
				keywords: this.keywords,
				type: this.searchType,
				offset: this.offset
			}
			const res = await this.$axios(params)
			this.prevOffset = this.offset
			switch (this.searchType) {
				case 1: 
					this.dataList = this.dataList.concat(res.result.songs)
			}
			// 取消加载中图标
			this.resultLoing = false
		},
		/**
		 * 切换标签
		 */
		changeTab (index) {
			this.searchType = this.tabArr[index]
			this.search(false)
		},
		sub () {
			alert('ppp')
		},
		/**
		 * 搜索历史
		 */
		initHistory () {
			this.searches_list = [];
			let searches=storage.get('_search_');  
			this.searches_list = searches ? searches : [];
		},
		// 加载更多
		loadMore () {
			this.offset = this.offset + this.limit
			this.search(true)
		}
	}
}
</script>

<style lang="scss" scoped>
header{
  height: 0.7rem;color: #fff;background-color: #d44439;width: 100%;position: relative;
  h1{
		width: 81vw;background-color: rgba(255, 255, 255, 0.3);height: 74%;position: absolute;
		top: 13%;left: 3vw;border-radius: 0.5rem;
		form{
			height: 100%;width: 100%;
		}
  }

	.field{
		background-color:transparent;height: 100%;border-radius: 0.5rem;width: 88%;
		padding:0 0.2rem;color: #fff;font-size: 0.24rem;border:none;display: block;
	}
	.iconfont{
		position: absolute;right: 0.1rem;font-size: 0.33rem;color: rgba(0, 0, 0, 0.3);top: 0.08rem;
	}
}
.searchBtn{
  display: block;height: 100%;width: 14vw;position: absolute;top: 0;right: 0;color: #fff;text-align: center;line-height: 0.7rem;
	font-size: 0.3rem;text-align: center;
}
.recordCls{
	width: 100%;padding: 0 3vw;margin-top: 0.3rem;
	h2{
		font-size: 0.27rem;color: #000;margin-bottom: 0.3rem;
	}
	li{
		float: left;background-color: #eee;line-height: 0.6rem;padding: 0 0.25rem;border-radius: 0.5rem;
		margin: 0 0.1rem 0.2rem;
	}
}
.tabs{
	padding-left: 2vw;
}
.searchCon{
	height: 100vh;
}
input[type="search"]::-webkit-search-cancel-button{
    display: none;
}
.wrapper{
	overflow:hidden; padding-top: 0.2rem;
	height: calc(100vh - 3rem - 45px);
}
</style>
