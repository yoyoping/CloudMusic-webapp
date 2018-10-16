<template>
  <div class="layout">
    <keep-alive v-if="$route.meta.isKeep">
      <router-view />
    </keep-alive>
    <router-view v-else />
    <TabBar />
  </div>
</template>
<script>
import TabBar from './TabBar'
export default {
  components: {
    TabBar
  },
  watch: {
    $route (newVal) {
    }
  }
}
</script>
<style lang="scss" scoped>
.layout{
  padding-bottom: 1rem;
}
</style>

