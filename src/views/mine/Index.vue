<template>
  <div class="mine">
    <div class="info">
      <p class="mark"></p>
      <div class="top">
        <img src="~@/assets/images/logo.jpg" class="avatar" alt="">
        <h1>张三</h1>
        <p class="fan">
          <span>关注 5</span>
          <span>粉丝 5</span>
        </p>
        <p class="tag">
          <span><i class="iconfont nan"></i> 95后</span>
          <span><i class="iconfont level"></i> 8</span>
          <span>成都</span>
          <span>水瓶座</span>
        </p>
      </div>
    </div>
    <div class="content">
      <van-tabs v-model="active">
        <van-tab title="音乐">
          <SongList></SongList>
        </van-tab>
        <van-tab title="动态">暂未开放，敬请期待</van-tab>
        <van-tab title="关于我">暂未开放，敬请期待</van-tab>
      </van-tabs>
      <van-button plain type="danger" class="exit" @click="logout">退出登录</van-button>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs, Button } from 'vant'
import SongList from './SongList'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    SongList
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    logout () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.info{
  width: 100%;height: 47vh;background: url('~@/assets/images/default.png') no-repeat;background-size: 103% 103%;
  background-position: 50% 50%;box-sizing: border-box;padding: 0.9rem 5vw 0;text-align: center;position: relative;
  .avatar{
    width: 1.5rem;height: 1.5rem;border-radius: 50%;
  }
  .mark{
    background-color: rgba(0,0,0,0.1);position: absolute;left: 0;top: 0;z-index: 0;width: 100%;height: 100%;
  }
  .top{
    position: relative;z-index: 2;color: #fff;
  }
  h1{
    font-size: 0.4rem;font-weight: bold;margin-top: 0.1rem;
  }
  .fan{
    margin-top: 0.13rem;text-align: center;color: #eee;font-size: 0.25rem;
    span{
      display: inline-block;height: 0.25rem;line-height: 0.25rem;
    }
    span:nth-of-type(1){
      padding-right: 0.2rem;margin-right: 0.2rem;border-right: 0.01rem solid #999;
    }
  }
  .tag{
    text-align: center;margin-top: 0.25rem;
    span{
      padding: 0.04rem 0.13rem;background-color:rgba(204,204,204,0.8);border-radius: 0.3rem;margin: 0 0.03rem;font-size: 0.2rem;color: #fff; 
    }
    .iconfont{
      font-size: 0.2rem;
    }
  }
}
.content{
  background-color: #fff;border-radius: 0.12rem;position: relative;top: -0.2rem;overflow: hidden;
  .van-tabs{
    border-top-left-radius: 0.12rem;
    border-top-right-radius: 0.12rem;
    overflow: hidden;
    position: static;
  }
  .van-tabs__wrap.van-hairline--top-bottom{
    width: 95%;margin: 0 auto;
    border-top-left-radius: 0.12rem;
    border-top-right-radius: 0.12rem;
    overflow: hidden;
  }
  .van-tab__pane{
    margin-top: 0.2rem;
  }
}
.exit{
  width: 90%;margin: 0.5rem auto;display: block;border-radius: 0.1rem;
}
</style>

