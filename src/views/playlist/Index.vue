<template>
  <div>
    <div class="bg">
      <img v-lazy="topDetail.coverImgUrl" alt="">
      <div class="info">
        <h2><em>{{topDetail.name}}</em></h2>
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
    <List :trackCount="topDetail.trackCount" :list="topDetail.tracks"></List>
  </div>
</template>
<script>
import List from '@/components/list/Index'
export default {
  components: {
    List
  },
  data () {
    return {
      topDetail: {}
    }
  },
  created () {
    this.getTopList()
  },
  methods: {
    async getTopList () {
      let res
      if (this.$route.name === 'playlist') {
        const params = {
          url: `songList`,
          id: this.$route.params.id
        }
        res = await this.$axios(params)
        
      } else {
        const params = {
          url: `musicTop`,
          idx: this.$route.params.idx
        }
        res = await this.$axios(params)
      }
      this.topDetail = res.playlist
      console.log(this.topDetail.tracks)
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
</style>
