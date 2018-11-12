<template>
  <div id="app">
    <img src="~@/assets/images/newStart.jpg" class="start animated" v-show="isStart" :class="{zoomOut: animated}" alt="">
    <div :class="{'pt-header': $route.meta.headerbg !== 'no'}">
      <Header></Header>
      <transition name="move">
        <player @close_="close" v-show="playerFlag"></player>
      </transition>
      <keep-alive v-if="$route.meta.isKeep">
        <router-view />
      </keep-alive>
      <router-view v-else />
    </div>
  </div>
</template>
<script>
import player from '@/components/player/Index'
import Header from '@/views/Header.vue'
export default {
  components: {
    player, Header
  },
  data () {
    return {
      playerFlag: true,
      isStart: false, // 是否是第一次进入
      animated: false // 动画开启
    }
  },
  created () {
    if (sessionStorage.isStart) {
      this.isStart = false
    } else {
      this.isStart = true

    }
  },
  mounted () {
    const setTimer = setTimeout(() => {
      this.animated = true
      sessionStorage.isStart = true
      this.isStart = false
    }, 3000)
  },
  methods: {
    close () {
      this.playerFlag = false
    }
  }
}
</script>
<style lang="scss">
@import './assets/style/style.scss';
// @import url('./assets/iconfont/iconfont.css'); // 引入图标库
@import url('//at.alicdn.com/t/font_844551_f4vligs0t2a.css'); // 引入图标库
.start{
  width: 100vw;height: 100vh;position: fixed;top: 0;left: 0;z-index: 5;
}
</style>
