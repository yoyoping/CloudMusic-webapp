<template>
  <div>
    <van-loading class="customize" color="#d44439" v-show="loading" />
    <div class="cls" v-show="!loading">
      <h2>歌单({{myPlaylist ? myPlaylist.length : 0}})</h2>
      <ul>
        <li v-for="(item, index) in myPlaylist" :key="index" @click="link(item.id)">
          <img v-lazy="item.coverImgUrl" alt="">
          <dl :class="{'van-hairline--bottom': index < myPlaylist.length - 1}">
            <dt class="van-ellipsis">{{item.name}}</dt>
            <dd>{{item.trackCount}}首，播放{{item.playCount}}次</dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="cls" v-show="!loading">
      <h2>收藏的歌单({{collList ? collList.length : 0}})</h2>
      <ul>
        <li v-for="(item, index) in collList" :key="index" @click="link(item.id)">
          <img v-lazy="item.coverImgUrl" alt="">
          <dl :class="{'van-hairline--bottom': index < collList.length - 1}">
            <dt class="van-ellipsis">{{item.name}}</dt>
            <dd>{{item.trackCount}}首，播放{{item.playCount}}次</dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { mapState } from 'vuex'
import { Loading } from 'vant'
export default {
  components: {
    [Loading.name]: Loading
  },
  data () {
    return {
      myPlaylist: [], // 自己创建的歌单
      collList: [], // 收藏歌单
      loading: true
    }
  },
  computed: {
    // ...mapState(['minePlayList'])
  },
  created () {
    this.getplaylist()
  },
  methods: {
    // 获取用户歌单
    async getplaylist () {
      const params = {
        urlCode: 'CD012',
        uid: Cookies.get('uid')
      }
      const res = await this.$axios(params)
      // 遍历判断是否是自己创建的歌单
      res.playlist.forEach(item => {
        if (item.creator.userId === Number(Cookies.get('uid'))){
          this.myPlaylist.push(item)
        } else {
          this.collList.push(item)
        }
      });
      this.loading = false
    },
    // 跳转歌单
    link (id) {
      this.$router.push(`/playlist/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.cls{
  h2{
    height: 0.5rem;padding-left: 0.2rem;font-size: 0.23rem;background-color: #eee;color: #888;line-height: 0.5rem;
  }
  ul{
    width: 100%;padding: 0 2vw;
  }
  li{
    display: flex;justify-content: space-between;height: 14vw;margin: 0.1rem 0;width: 100%;
    img{
      width: 14vw;height: 14vw;border-radius: 0.2rem;
    }
    dl{
      width: 78vw;height: 100%;padding: 0;margin: 0;padding-top: 0.1rem;
      dd{
        margin: 0;color: #888;font-size: 0.2rem;
      }
      dt{
        font-size: 0.3rem;
      }
    }
    &:last-child dl{
      border: none;
    }
  }
}
</style>

