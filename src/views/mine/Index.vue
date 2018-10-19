<template>
  <div class="mine">
    <div class="info">
      <img v-lazy="userinfo.backgroundUrl" class="bg" alt="">
      <p class="mark"></p>
      <div class="top">
        <img v-lazy="userinfo.avatarUrl" class="avatar" alt="">
        <h1>{{userinfo.nickname}}</h1>
        <p class="fan">
          <span>关注 {{userinfo.follows}}</span>
          <span>粉丝 {{userinfo.followeds}}</span>
        </p>
        <p class="tag">
          <span><i class="iconfont nan"></i> 95后</span>
          <span><i class="iconfont level"></i> {{userinfo.level}}</span>
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
import { Tab, Tabs, Button, Dialog } from 'vant'
import SongList from './SongList'
import Cookies from 'js-cookie'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    SongList
  },
  data () {
    return {
      active: 0,
      userinfo: {} // 用户信息
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    /**
     * 退出登录
     */
    logout () {
      Dialog.confirm({
        title: '退出提示',
        message: '确认退出当前账号吗 ？'
      }).then(() => {
        Cookies.remove('loginStatus')
        Cookies.remove('uid')
        this.$router.push('/login')
      })
    },
    /**
     * 获取用户详情
     */
    async getUserInfo () {
      const params = {
        url: 'userDetail',
        uid: Cookies.get('uid')
      }
      const res = await this.$axios(params)
      this.userinfo = res.profile
      this.userinfo.level = res.level
    }
  }
}
</script>

<style lang="scss" scoped>
.info{
  .bg{
    width: 100%;position: absolute;left: 0;top: 0;
  }
  width: 100%;height: 47vh;background-size: 103% 103%;
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

