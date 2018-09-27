<template>
  <div class="player">
    
    <audio id="audio" ref="audio" autoplay :src="songUrl" loop></audio>
    <div class="info">
      <div class="th">
        <i class="iconfont xiajiantou"></i>
        <h2>歌曲名 <span>zhangping</span></h2>
      </div>
      <div class="pic rotate">
        <p>
          <img :src="songBgPic" alt="">
        </p>
      </div>
    </div>
    <div class="contr">
      <div class="mainProgress">
        <Format :count="songDta.currentTime" class="time"></Format>
        <Progress :currentTime="songDta.timeProgress" class="progress"></Progress>
        <Format :count="songDta.duration" class="time rg"></Format>
      </div>
      <div class="ctrBtn">
        <p class="mode">
          <i class="iconfont xunhuanbofang"></i>
        </p>
        <p class="imCtr">
          <i class="iconfont shangyishoushangyige"></i>
          <i class="iconfont bofang1 play" @click="play(true)" v-show="!songDta.isPlay"></i>
          <i class="iconfont zanting play" @click="play(false)" v-show="songDta.isPlay"></i>
          <i class="iconfont xiayigexiayishou"></i>
        </p>
        <p class="list"><i class="iconfont liebiao"></i></p>
      </div>
    </div>
    <!-- <button @click="$refs.audio.play()">播放</button> -->
    <p class="songBgPic"><img :src="songBgPic" alt=""></p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Progress from './Progress'
import Format from '../format/Index'
export default {
  components: {
    Progress, Format
  },
  data () {
    return {
      songDta: {
        duration: 0, // 当前歌曲的总时长
        currentTime: 0, // 歌曲当前播放的时间
        timeProgress: 0, // 当前播放时间占总时间的百分比
        isPlay: false // 是否正在播放中，默认暂停
      }, // 歌曲详情
      musicUrl: '', // 音乐地址
      timer: null
    }
  },
  computed: {
    ...mapState(['songUrl', 'songBgPic'])
  },
  created () {
    // this.$refs.audio.pause()
    // this.songDetail()
    // this.getMusic()
    // this.autoPlayMusic()
  },
  mounted () {
    this.listenSong()
  },
  methods: {
    /**
     * 监听歌曲信息
     */
    listenSong () {
      this.songInfo()
      this.timer = setInterval(this.songInfo, 1000)
    },
    songInfo () {
      this.songDta.duration = isNaN(parseInt(this.$refs.audio.duration)) ? 0 : parseInt(this.$refs.audio.duration) // 当前歌曲总时长
      this.songDta.currentTime = parseInt(this.$refs.audio.currentTime) // 当前播放时间
      this.songDta.timeProgress = (this.songDta.currentTime / this.songDta.duration) * 100 // 当前播放的时间占百分比
      if (this.songDta.timeProgress === 100) {
        clearInterval(this.timer)
        this.timer = null
      }
      console.log(this.songDta.duration)
    },
    /**
     * 获取歌曲详情
     */
    async songDetail () {
      const res = await this.$api.songDetail({
        ids: Number(this.$route.query.id)
      })
      console.log(res)
    },
    play (type) {
      if (type) {
        this.$refs.audio.play()
        this.songDta.isPlay = true
        console.log(this.songDta.isPlay)
      } else {
        this.$refs.audio.pause()
        this.songDta.isPlay = false
      }
      this.songInfo()
    }

  },
  watch: {
    songUrl (newUrl) {
      this.$refs.audio.src = this.newUrl
      this.$refs.audio.play()
      // this.$nextTick(() => {
      //   this.$refs.audio.play()
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.player{
  position: fixed;bottom: 0;left: 0;height: 80vh;background-color: #666;width: 100%;z-index: 3;color: #fff;
}
.mainProgress{
  width: 100vw;margin: 0.3rem auto;display: flex;justify-content: space-between;color: #fff;
  .time{
    width: 12vw;text-align: center;font-size: 0.2rem;
  }
  .rg{
    opacity: 0.6;
  }
  .progress{
    width: 70vw;
  }
}
.contr{
  position: absolute;left: 0;bottom: 0;height: 15vh;z-index: 2;
}
.ctrBtn{
  color: #fff;display: flex;justify-content: space-between;
  p{
    line-height: 0.6rem;
  }
  .iconfont{
    font-size: 0.46rem;
  }
  .list, .mode{
    width: 16vw;text-align: center;
  }
  .imCtr{
    width: 58vw;display: flex;justify-content: space-around;
    .iconfont{
      font-size: 0.52rem;
      &.play {
        font-size: 0.7rem;
      }
    }
  }
}
.songBgPic{
  width: 100%;height: 100%;position: absolute;left: 0;top: 0;
  img{
    width: 100%;height: 100%;
    -webkit-filter: blur(20px);
    -moz-filter: blur(20px);
    -o-filter: blur(20px);
    -ms-filter: blur(20px);
    filter: blur(20px);
    position: absolute;top: 0;left: 0;z-index: -1;
  }
}
.th{
  width: 100%;height: 0.9rem;position: relative;border-bottom: 0.01rem solid #999;
  .iconfont{
    font-size: 0.7rem;position: absolute;left: 0.2rem;top: 0;
  }
  h2{
    text-align: center;font-size: 0.3rem;padding-top: 0.05rem;box-sizing: border-box;
    span{
      display: block;font-size: 0.2rem;
    }
  }
}
.pic{
  width: 80vw;height: 80vw;margin: 10vh auto;border-radius: 50%;overflow: hidden;
  background-color: rgba(238, 238, 238, 0.116);padding: 0.2rem;
  p{
    width: 100%;height: 100%;background-color: #333;padding: 1rem;border-radius: 50%;overflow: hidden;
    img{
      width: 100%;height: 100%;border-radius: 50%;
    }
  }
}
.rotate{
  animation: rotate 15s linear infinite;
}
@-webkit-keyframes rotate{
  from{
    -webkit-transform: rotate(0deg)
  }
  to{
    -webkit-transform: rotate(360deg)
  }
}
@keyframes rotate{
  from{
    -webkit-transform: rotate(0deg)
  }
  to{
    -webkit-transform: rotate(360deg)
  }
}
</style>
