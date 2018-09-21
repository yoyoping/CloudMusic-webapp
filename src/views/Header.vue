<template>
  <header>
    <h1>cloudMusic</h1>
    <router-link class="search" to=""><i class="iconfont icon-test"></i></router-link>
  </header>
</template>
<style lang="scss" scoped>
header{
  height: 0.9rem;color: #fff;background-color: #d44439;position: fixed;top: 0;left: 0;z-index:2;width: 100%;
  h1{
    font-size: 0.36rem;color: #fff;text-align: center;line-height: 0.9rem;
  }
}
.search{
  display: block;height: 100%;position: absolute;top: 0;right: 0.3rem;color: #fff;text-align: center;line-height: 0.9rem;
}
.iconfont{
  font-size: 25px;
}
</style>
