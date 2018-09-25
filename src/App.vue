<template>
  <div id="app">
    <keep-alive v-if="$route.meta.isKeep">
      <router-view />
    </keep-alive>
    <router-view v-else />
    <player></player>
  </div>
</template>
<script>
import player from '@/components/player/Index'
export default {
  components: {
    player
  }
}
</script>

<style lang="scss">
@import './assets/style/style.scss';
@import url('//at.alicdn.com/t/font_844551_3xs6v35qo9y.css'); // 引入图标库
</style>
