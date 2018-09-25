<template>
  <div>
    <div class="bg">
      <img v-lazy="topDetail.coverImgUrl" alt="">
      <div class="info">
        <h2><em>云音乐飙升榜</em></h2>
        <ul>
          <li>
            <i class="iconfont pinglun"></i>
            {{topDetail.commentCount}}
          </li>
          <li>
            <i class="iconfont fenxiang"></i>
            {{topDetail.shareCount}}
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <h2>
        <i class="iconfont bofang"></i>
        播放全部<span>(共{{topDetail.trackCount}}首)</span>
      </h2>
      <ul>
        <li v-for="(item, index) in topDetail.tracks" :key="item.id">
          <label :class="{red: index < 3}">{{(index < 9) ? `0${index + 1}` : (index + 1)}}</label>
          <div @click="getMusicUrl(item.id)">
            <h3>{{item.name}}<span class="des" v-if="item.alia[0]">({{item.alia[0]}})</span></h3>
            <p>{{item.ar | arName}} - {{item.al.name}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      topDetail: {}
    }
  },
  created () {
    this.getTopList()
  },
  filters:{
    arName (arr) {
      let name = []
      arr.forEach(item => {
        name.push(item.name)
      })
      return name.join('/')
    }
  },
  methods: {
    ...mapActions(['getMusicUrl']),
    async getTopList () {
      const res = await this.$api.musicTop({idx: this.$route.params.idx})
      this.topDetail = res.playlist
      console.log(res)
    }
  }
}
</script>
<style lang="scss" scoped>
.bg{
  width: 100%;height: 100vw;position: relative;
  img{
    width: 100%;height: 100%;position: relative;bottom: 25vw;
  }
  .info{
    position: absolute;left: 10vw;bottom: 35vw;color: #fff;
  }
  h2{
    margin-bottom: 0.3rem;
    em{
      font-style: italic;
    }
  }
  ul{
    display: flex;justify-content: flex-start;
  }
  li{
    text-align: center;padding: 0 0.1rem;margin-right: 0.7rem;
    .iconfont{
      display: block;margin-bottom: 0.04rem;font-size: 0.4rem;
    }
  }
}
.content{
  width: 100%;background-color: #fff;border-radius: 0.2rem;
  position: relative;top: -29vw;
  h2{
    font-size: 0.3rem;padding: 0.17rem 0.14rem;
    .iconfont{
      font-size: 0.37rem;position: relative;top: 0.03rem;margin-right: 0.05rem;
    }
    span{
      font-size: 0.27rem;color: #999;margin-left: 0.04rem;
    }
  }
  li{
    width: 100vw;display: flex;justify-content: space-between;height: 1rem;
    label{
      width: 10vw;height: 100%;line-height: 1rem;text-align: center;font-size: 0.3rem;color: #999;
    }
    .red{
      color: #d44439;
    }
    div{
      width: 90vw;border-top: 0.01rem solid #ddd;height: 100%;padding: 0.1rem 0;box-sizing: border-box;
    }
    h3{
      font-size: 0.3rem;overflow: hidden;
      white-space: nowrap;text-overflow: ellipsis;
      .des{
        color: #999;
      }
    }
    p{
      color: #999;overflow: hidden;
      white-space: nowrap;text-overflow: ellipsis;
    }
  }
}
</style>
