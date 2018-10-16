<template>
  <header>
    <router-link :to="$route.meta.goback" class="back" v-if="$route.meta.goback">
      <i class="iconfont zuojiantou"></i>
    </router-link>
    <h1>cloudMusic</h1>
    <span class="toplay" @click="SET_OPENPLAYER(true)"><i class="iconfont zhengzaibofang"></i></span>
  </header>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['SET_OPENPLAYER'])
  }
}
</script>

<style lang="scss" scoped>
header{
  height: 0.9rem;color: #fff;background-color: #d44439;position: fixed;top: 0;left: 0;z-index:2;width: 100%;
  h1{
    font-size: 0.36rem;color: #fff;text-align: center;line-height: 0.9rem;
  }
}
.toplay{
  display: block;height: 100%;position: absolute;top: 0;right: 0.3rem;color: #fff;text-align: center;line-height: 0.9rem;
}
.iconfont{
  font-size: 0.5rem;
}
.back{
  width: 0.6rem;
  display: block;height: 100%;position: absolute;top: 0;left: 0.2rem;color: #fff;text-align: center;line-height: 0.9rem;
}
</style>
