<template>
  <div class="layout">
    <van-loading color="#d44439" v-show="loadState && $route.meta.needLoading" />
    <keep-alive v-if="$route.meta.isKeep" v-show="!loadState || !$route.meta.needLoading">
      <router-view />
    </keep-alive>
    <router-view v-else  v-show="!loadState || !$route.meta.needLoading" />
    <TabBar v-show="!$route.meta.noTabbar" />
  </div>
</template>
<script>
import TabBar from "./TabBar";
import { Loading } from "vant";
import { mapState } from "vuex";
export default {
  components: {
    TabBar,
    [Loading.name]: Loading
  },
  computed: {
    ...mapState(["loadState"])
  },
  watch: {
    $route() {}
  }
};
</script>
<style lang="scss" scoped>
.layout {
  padding-bottom: 1rem;
}
.van-loading {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%);
}
</style>
