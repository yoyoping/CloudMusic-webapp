<template>
  <div class="pt-header">
    <Header></Header>
    <keep-alive v-if="$route.meta.isKeep">
      <router-view />
    </keep-alive>
    <router-view v-else />
  </div>
</template>
<script>
import Header from '@/views/Header.vue'
export default {
  components: {
    Header
  }
}
</script>
