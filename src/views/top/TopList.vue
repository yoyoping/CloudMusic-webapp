<template>
  <div class="top">
    <div class="part-yun">
      <h2>云音乐官方榜</h2>
      <div class="cls" v-for="cls in topYunList" :key="cls.playlist.id">
        <router-link :to="`/top/${cls.playlist.idx}`">
          <img v-lazy="cls.playlist.coverImgUrl" alt="">
          <ul>
            <li v-for="(item, index) in cls.playlist.tracks" :key="index" v-if="index < 3">
              {{`${index + 1}. ${item.name} - ${item.ar[0].name}`}}
            </li>
          </ul>
        </router-link>
      </div>
    </div>
    <div class="part-other">
      <h2>全球榜</h2>
      <ul>
        <li v-for="item in topOtherList" :key="item.playlist.id">
          <router-link :to="`/top/${item.playlist.idx}`">
            <div>
              <img v-lazy="item.playlist.coverImgUrl" alt="">
              <!-- <span>{{item.playlist.creator.signature}}</span> -->
            </div>
            <p>{{item.playlist.name}}</p>
          </router-link>
        </li>
        <li v-if="topOtherList.length % 3 === 2"></li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      topYunList: [], // 云音乐官方排行榜
      topOtherList: [] // 全球音乐排行榜
    }
  },
  created () {
    this.getTopYun()
    this.getTopOther()
  },
  methods: {
    ...mapMutations({
      setLoad: 'SET_LOAD'
    }),
    /**
     * 获取云音乐官方排行榜
     */
    async getTopYun () {
      const YunMusic = [3, 0, 2, 1, 4, 22, 23]
      const res = await axios.all(YunMusic.map(item => {
        const params = {
          url: `musicTop`,
          idx: item
        }
        return this.$axios(params)
        }))
      console.log(res)
      this.setLoad(false)
      this.topYunList = res
      this.topYunList.forEach((item, index) => {
        item.playlist.idx = YunMusic[index]
      })
    },
    /**
     * 获取全球音乐的排行榜
     */
    async getTopOther () {
      const otherMusic = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
      const res = await axios.all(otherMusic.map(item => {
        const params = {
          url: `musicTop`,
          idx: item
        }
        return this.$axios(params)
      }))
      console.log(res)
      this.topOtherList = res
      this.topOtherList.forEach((item, index) => {
        item.playlist.idx = otherMusic[index]
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'top') {
      to.meta.isKeep = true
    } else {
      to.meta.isKeep = false
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
.top{
  padding: 2vw 1.2vw;
}
h2{
  font-size: 0.3rem;color: #111;margin-bottom: 0.2rem;
}
.part-yun{
  a{
    display: block;width: 100%;height: 100%;padding: 0;margin: 0;display: flex;justify-content: space-between;
  }
  .cls{
    display: flex;justify-content: space-between;height: 31v;margin-bottom: 0.6vw;
  }
  img{
    width: 32vw;height: 32vw;border-radius: 0.1rem;
  }
  ul{
    width: 63vw;height: 32vw;padding-top: 0.28rem;border-bottom: 0.01rem solid #ddd;box-sizing: border-box;
  }
  li{
    line-height: 0.6rem;color: #666;font-size: 0.25rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
  }
}
.part-other{
  margin-top: 0.5rem;
  ul{
    display: flex;justify-content: space-between;flex-flow: row wrap;

  }
  li{
    align-items: baseline;
    width: 32vw;margin-bottom: 0.4rem;
    &:last-child{
      float: left;
    }
    div{
      width: 32vw;height: 32vw;position: relative;
    }
    img{
      width: 100%;border-radius: 0.1rem;
    }
    span{
      position: absolute;left: 0.2rem;bottom: 0.1rem;color: #fff;font-size: 0.2rem;
    }
  }
  p{
    line-height: 0.38rem;margin-top: 0.1rem;height: 0.67rem;overflow: hidden;padding: 0 0.1rem;
      text-overflow: ellipsis;
      display: -webkit-box; //将元素设为盒子伸缩模型显示
      -webkit-box-orient: vertical; //伸缩方向设为垂直方向
      -webkit-line-clamp: 2;  //超出3行隐藏，并显示省略号
  }
}
</style>
