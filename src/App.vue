<template>
  <div id="app">
    <div :class="{'pt-header': $route.meta.headerbg !== 'no'}">
      <Header></Header>
      <keep-alive v-if="$route.meta.isKeep">
        <router-view />
      </keep-alive>
      <router-view v-else />
      <transition name="move">
        <player @close_="close" v-show="playerFlag"></player>
      </transition>
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
      playerFlag: true
    }
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
@import url('//at.alicdn.com/t/font_844551_ott60pjbqb8.css'); // 引入图标库
</style>
