<template>
  <div class="pt-header">
    <Header></Header>
    <router-view />
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
