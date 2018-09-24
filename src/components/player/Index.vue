<template>
  <div class="player">
    <audio id="audio" ref="audio" autoplay controls="controls" :src="songUrl"></audio>
    <!-- <button @click="$refs.audio.play()">播放</button> -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      songDta: {}, // 歌曲详情
      musicUrl: '' // 音乐地址
    }
  },
  computed: {
    ...mapState(['songUrl'])
  },
  created () {
    // this.$refs.audio.pause()
    // this.songDetail()
    // this.getMusicUrl()
    // this.autoPlayMusic()
  },
  methods: {
    async songDetail () {
      const res = await this.$api.songDetail({
        ids: Number(this.$route.query.id)
      })
      console.log(res)
    },
    async getMusicUrl () {
      const res = await this.$api.musicUrl({
        id: Number(this.$route.query.id)
      })
      console.log(res)
      this.musicUrl = res.data[0].url
      this.$refs.audio.src = this.musicUrl
      this.$refs.audio.play()
      this.autoPlayMusic()
    },
    autoPlayMusic () {
      var wx = require('weixin-js-sdk')
      wx.config({
          debug: false,
          appId: '',
          timestamp: 1,
          nonceStr: '',
          signature: '',
          jsApiList: []
        });
        wx.ready(function() {
          this.$refs.audio.play();
        });
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
  position: fixed;bottom: 0;left: 0;
}
</style>
