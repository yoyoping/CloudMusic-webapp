<template>
<div>
  <transition name="move">
    <div class="player" v-show="showFlag">
      <div class="mark"></div>
      <audio id="audio" ref="audio" autoplay @ended="musicEnd" :src="songUrl" :loop="mode === 3"></audio>
      <div class="info">
        <div class="th">
          <i class="iconfont xiajiantou" @click="$store.commit('SET_OPENPLAYER', false)"></i>
          <h2>{{musicDetail.name}} <span>{{musicDetail.singer}}</span></h2>
        </div>
        <!-- 图片 -->
        <div class="pic" :class="{rotate: !paused}" @click="isLrc = true" v-show="!isLrc">
          <p>
            <img :src="musicDetail.picUrl" alt="">
          </p>
        </div>
        <!-- 歌词 -->
        <div class="lyricWrapper">
          <Scroll class="middle-r" ref="lyricList" v-show="isLrc" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div class="currentLyric" v-if="currentLyric">
                <p ref="lyricLine" class="text" :class="{'current': currentLineNum === index}"
                  v-for="(line, index) in currentLyric.lines" :key="line.key">
                  {{line.txt}}
                </p>
              </div>
                <p class="no-lyric" v-if="noLyric">无歌词</p>
            </div>
          </Scroll>
        </div>
      </div>
      <div class="contr">
        <p class="action">
          <i class="iconfont" :class="{xihuan: collectList.includes(currentSongId), weixihuan: !collectList.includes(currentSongId)}" @click="ACTION_COLLECT(currentSongId)"></i>
          <i class="iconfont fenxiang"></i>
          <span class="comment">
            <i class="iconfont pinglun"></i>
            <em>999+</em>
          </span>
          <i class="iconfont gengduoxiao"></i>
        </p>
        <div class="mainProgress">
          <Format :count="songDta.currentTime" class="time"></Format>
          <Progress :currentTime="songDta.timeProgress" class="progress" @change="changeCurrentTime"></Progress>
          <Format :count="songDta.duration" class="time rg"></Format>
        </div>
        <div class="ctrBtn">
          <p class="mode">
            <i class="iconfont" :class="{xunhuanbofang: mode === 1, suijibofang: mode === 2, danquxunhuan: mode === 3}" @click="swichMode"></i>
          </p>
          <p class="imCtr">
            <i class="iconfont shangyishoushangyige" @click="playSwitch('prev')"></i>
            <i class="iconfont bofang1 play" @click="play(true)" v-show="paused"></i>
            <i class="iconfont zanting play" @click="play(false)" v-show="!paused"></i>
            <i class="iconfont xiayigexiayishou" @click="playSwitch('next')"></i>
          </p>
          <p class="list"><i class="iconfont liebiao"></i></p>
        </div>
      </div>
      <p class="songBgPic"><img :src="musicDetail.picUrl" alt=""></p>
    </div>
  </transition>
</div>
 
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Progress from './Progress'
import Format from '../format/Index'
import { randomNum, isiOS } from '@/util'
import Lyric from 'lyric-parser'
import Scroll from '../scroll/Index'
export default {
  components: {
    Progress, Format, Scroll
  },
  data () {
    return {
      mode: 1, // 播放模式，1-顺序 2-随机 3-单曲
      paused: true, // 当前音乐是否暂停
      showFlag: false, // 是否显示播放页
      songDta: {
        duration: 0, // 当前歌曲的总时长
        currentTime: 0, // 歌曲当前播放的时间
        timeProgress: 0, // 当前播放时间占总时间的百分比
        isPlay: false // 是否正在播放中，默认暂停
      }, // 歌曲详情
      musicUrl: '', // 音乐地址
      timer: null,
      isLeave: true, // 手指是否还在进度条上
      currentLyric: null, // 当前歌词
      isLrc: false, // 当前是否显示歌词
      currentLineNum: 0, // 高亮行
      initSongId: 40249016 // 默认歌曲id 
    }
  },
  computed: {
    ...mapState(['songUrl', 'openPlayer', 'musicDetail', 'playList', 'currentSongId', 'lyric', 'collectList', 'noLyric'])
  },
  created () {
    console.log('加载默认音乐')
    this.initSong()
  },
  mounted () {
    this.listenSong()
    console.log(this.$route)
  },
  methods: {
    ...mapMutations(['SET_SONGURL', 'SET_MUSICID', 'SET_MUSICDETAIL', 'ACTION_COLLECT']),
    ...mapActions(['getMusic']),
    /**
     * 加载默认音乐
     */
    initSong () {
      this.getMusic(this.initSongId)
    },
    /**
     * 监听歌曲信息
     */
    listenSong () {
      this.songInfo()
      this.timer = setInterval(this.songInfo, 100)
    },
    /**
     * 当前播放信息
     */
    songInfo () {
      // 当前音乐状态
      if (this.$refs.audio.paused !== 'undefined') {
        this.paused = this.$refs.audio.paused
      }
      this.songDta.duration = isNaN(parseInt(this.$refs.audio.duration)) ? 0 : parseInt(this.$refs.audio.duration) // 当前歌曲总时长
      if (this.isLeave) {
        this.songDta.currentTime = parseInt(this.$refs.audio.currentTime) // 当前播放时间
      }
      // console.log(this.songDta.currentTime)
      this.songDta.timeProgress = (this.songDta.currentTime / this.songDta.duration) * 100 // 当前播放的时间占百分比
      if (this.songDta.timeProgress === 100) {
        // clearInterval(this.timer)
        // this.timer = null
      }
    },
    /**
     * 获取歌曲详情
     */
    async songDetail () {
      const params = {
        url: `songDetail`,
        ids: Number(this.$route.query.id)
      }
      const res = await this.$axios(params)
      console.log(res)
    },
    /**
     * 播放/暂停音乐
     */
    play (type) {
      if (type) {
        this.paused = false
        this.$refs.audio.play()
        this.songDta.isPlay = true
      } else {
        this.paused = true
        this.$refs.audio.pause()
        this.songDta.isPlay = false
      }
      // this.listenSong()

      // 是否播放歌词
      // if (!this.paused) {
      //   this.currentLyric.play()
      //   // 歌词重载以后 高亮行设置为 0
      //   this.currentLineNum = 0
      //   this.$refs.lyricList.scrollTo(0, 0, 1000)
      // } else {
      //   this.currentLyric.stop()
      // }
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
      
    },
    /**
     * 切换音乐
     */
    playSwitch (type) {
      let currentIndex = this._.findIndex(this.playList, { id: this.currentSongId }); // 获取当前音乐的在记录列表中的下标
      let redeyMusic
      if (this.mode === 1 || this.mode === 3) { // 顺序循环播放(当单曲模式切换也是顺序播放，只有如果不切换会单曲循环)
        if (type === 'prev') { // 上一首
          if (currentIndex === 0) {
            currentIndex = this.playList.length
          }
          redeyMusic = this.playList[currentIndex - 1];
        } else { // 下一首
          if (currentIndex === (this.playList.length - 1)) {
            currentIndex = -1
          }
          redeyMusic = this.playList[currentIndex + 1];
        }
      } else if (this.mode === 2) { // 随机播放
        const index = randomNum(0, this.playList.length - 1)
        console.log(index)
        redeyMusic = this.playList[index]
      }
      // 将播放的信息同步到vuex
      this.SET_SONGURL(redeyMusic.musicurl)
      this.SET_MUSICID(redeyMusic.id)
      this.SET_MUSICDETAIL({
        name: redeyMusic.name,
        singer: redeyMusic.singer,
        picUrl: redeyMusic.pic
      })
    },
    /**
     * 切换模式
     */
    swichMode () {
      this.mode += 1
      if (this.mode === 4) this.mode = 1
    },
    /**
     * 设置歌曲播放时间
     */
    changeCurrentTime (param, isEnd) {
      const current = this.songDta.duration * param / 100 // 当前拖动进度条后的播放时间
      if (isEnd) {
        this.$refs.audio.currentTime = parseInt(current)
        this.isLeave = true
      } else {
        this.songDta.currentTime = parseInt(current)
        this.isLeave = false
      }
    },
    /**
     * 获取当前播放歌曲歌词
     */
    async getLyric () {
      console.log('重新加载歌词')
      // 歌词重载以后 高亮行设置为 0
      this.currentLineNum = 0
      this.$refs.lyricList.scrollTo(0, 0, 1000)
      this.currentLyric = new Lyric(this.lyric, this.handleLyric)
      if (!this.paused) {
        this.currentLyric.play()
      }
    },
    /**
     * 歌词更改时
     */
    handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      console.log(lineNum)
      if (lineNum > 4) {
        let lineEl = this.$refs.lyricLine[lineNum - 4]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        // this.$refs.lyricList.scrollTo(0, 0, 20)
      }
    },
    /**
     * 监听音乐是否已经播放结束
     */
    musicEnd () {
      this.paused = true
    }
  },
  watch: {
    songUrl (newUrl) {
      this.$refs.audio.src = this.newUrl
      this.$refs.audio.play()
      console.log(isiOS)
      if (!isiOS) {
        this.paused = false
      }
      if (this.lyric) {
        this.getLyric()
      }
      // this.$nextTick(() => {
      //   this.$refs.audio.play()
      // })
    },
    openPlayer (newVal) {
      this.showFlag = newVal
    },
    // 歌词变化
    lyric (newVal) {
      if (this.songUrl) {
        this.getLyric()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.player{
  position: fixed;bottom: 0;left: 0;height: 100vh;background-color: #666;width: 100%;z-index: 3;color: #fff;
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
  position: absolute;left: 0;bottom: 0;height: 22vh;z-index: 2;
}
.action{
  width: 100%;color: #fff;display: flex;justify-content: space-between;padding: 0 14vw;font-size: 0.5rem;margin-bottom: 0.4rem;
  .iconfont{
    font-size: 0.5rem;
  }
  span{
    position: relative;
    em{
      position: absolute;top: -0.1rem;right: -0.3rem;font-style: normal;font-size: 0.2rem;
    }
  }
}
.ctrBtn{
  color: #fff;display: flex;justify-content: space-between;margin-top: 0.4rem;
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
  width: 100%;height: 100%;position: absolute;left: 0;top: 0;z-index: -1;
  img{
    width: 100%;height: 100%;
    -webkit-filter: blur(20px);
    -moz-filter: blur(20px);
    -o-filter: blur(20px);
    -ms-filter: blur(20px);
    filter: blur(20px);
    position: absolute;top: 0;left: 0;
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
    -webkit-transform: rotate(0deg);
  }
  to{
    -webkit-transform: rotate(360deg);
  }
}
@keyframes rotate{
  from{
    -webkit-transform: rotate(0deg);
  }
  to{
    -webkit-transform: rotate(360deg);
  }
}

.move-leave-active {
  transition: all .2s linear;
  transform: translate(0, 100vh);
}
.move-leave {
  transform: translate(0, 0)
}
.move-enter-active {
  transition: all .2s linear;
  transform: translate(0, 0);
}
.move-enter {
  transform: translate(0, 100vh);
}
.mark {
  width: 100vw;height: 100vh;background-color: rgba(0, 0, 0, 0.28);position: absolute;top: 0;left: 0;z-index: 0;
}
.info {
  position: relative;z-index: 1;
}
.lyricWrapper {
  width: 90vw;height: 53vh;margin: 8vh auto;text-align: center;color: #ccc;font-size: 0.28rem;
  p.text {
    margin: 0.4rem 0;
  }
  p.current {
    color: #fff;
  }
}
i.xihuan {
  color: #d44439;
}
</style>
