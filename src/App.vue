<template>
  <div id="app">
    <keep-alive v-if="$route.meta.isKeep">
      <router-view />
    </keep-alive>
    <router-view v-else />
    <transition name="move">
      <player @close_="close" v-show="playerFlag"></player>
    </transition>
  </div>
</template>
<script>
import player from '@/components/player/Index'
export default {
  components: {
    player
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
@import url('//at.alicdn.com/t/font_844551_b7lducyvf55.css'); // 引入图标库
</style>
