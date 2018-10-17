<template>
	<div class="tabbar">
		<p>
			<router-link to="/" :class="{active: $route.meta.menuName === 'music'}">
				<i class="iconfont icon-test1"></i>
				发现
			</router-link>
		</p>
		<p>
			<router-link to="/mine" :class="{active: $route.meta.menuName === 'mine'}">
				<i class="iconfont wode"></i>
				我的
			</router-link>
		</p>
	</div>
</template>
<style lang="scss" scoped>
.tabbar{
	height: 0.9rem;color: #666;background-color: rgba(238, 238, 238, 0.98);position: fixed;bottom: 0;left: 0;z-index:2;width: 100vw;
	display: flex;justify-content: space-around;border-top: 0.01rem solid #ccc;
	a{
		font-size: 0.2rem;text-align: center;
	}
	.active{
		color: #d44439;
	}
	p{
		text-align: center;
	}
	.iconfont{
		font-size: 0.45rem;display: block;
	}
}
</style>

