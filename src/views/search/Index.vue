<template>
  <div class="searchCon">
		<header>
			<h1>
				<input type="text" class="field placeholder" :placeholder="placeholder" v-model="keywords">
				<i class="iconfont guanbi" @click="keywords = ''" v-show="keywords"></i>
			</h1>
			<span class="searchBtn" @click="search">搜索</span>
		</header>
		<div class="recordCls van-hairline--bottom">
			<h2>热门搜索</h2>
			<ul class="clearfix">
				<li v-for="(item, index) in hotList" :key="index" @click="hotSearch(item.first)">{{item.first}}</li>
			</ul>
		</div>
		<div class="recordCls van-hairline--bottom"  v-show="false">
			<h2>搜索记录</h2>
			<ul class="clearfix">
				<li>李荣浩贝贝</li>
				<li>李荣浩贝</li>
				<li>浩贝贝</li>
				<li>李荣浩贝</li>
				<li>李荣浩贝贝</li>
				<li>李浩贝</li>
				<li>李荣浩贝贝</li>
				<li>李荣浩贝</li>
				<li>李荣贝贝</li>
			</ul>
		</div>
		<div>
			<van-tabs class="tabs" @click="changeTab">
				<van-tab title="单曲">
					<Tab1 :list="dataList"></Tab1>
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
import { Tab, Tabs } from 'vant'
import Tab1 from './Tab1'
export default {
	components: {
		[Tab.name]: Tab,
		[Tabs.name]: Tabs,
		Tab1
	},
	data () {
		return {
			placeholder: '',
			searchType: 1, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
			keywords: '',
			hotList: [], // 热搜
			tabArr: [1, 1014, 100, 10, 1000, 1009],
			dataList: []
		}
	},
	created () {
		this.searchHot()
	},
	methods: {
		/**
		 * 热搜列表
		 */
		async searchHot () {
			const params = {
				url: 'searchHot'
			}
			const res = await this.$axios(params)
			this.hotList = res.result.hots
			this.placeholder = this.hotList[0].first
		},
		/**
		 * 热门搜索
		 * keywords 关键字
		 */
		hotSearch (keywords) {
			this.keywords = keywords
			this.search()
		},
		/**
		 * 搜索
		 */
		async search () {
			// 如果没有输入关键字，则将热门搜索第一个做为关键词搜索
			this.keywords = this.keywords ? this.keywords : this.hotList[0].first
			const params = {
				url: 'search',
				keywords: this.keywords,
				type: this.searchType 
			}
			const res = await this.$axios(params)
			console.log(res)
			switch (this.searchType) {
				case 1: 
					this.dataList = res.result.songs
			}
		},
		/**
		 * 切换标签
		 */
		changeTab (index) {
			this.searchType = this.tabArr[index]
			this.search()
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
	padding-left: 1.5vw;
}
</style>
