<template>
  <div>
    <audio id="audio" ref="audio" autoplay="autoplay" controls="controls"></audio>
    <button @click="$refs.audio.play()">播放</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      songDta: {}, // 歌曲详情
      musicUrl: '' // 音乐地址
    }
  },
  created () {
    this.songDetail()
    this.getMusicUrl()
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
    musicUrl (newUrl) {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    }
  }
}
</script>
