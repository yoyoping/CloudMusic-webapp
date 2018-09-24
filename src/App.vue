<template>
  <div id="app">
    <router-view/>
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
@import url('//at.alicdn.com/t/font_844551_sct5kq2wize.css'); // 引入图标库
</style>
