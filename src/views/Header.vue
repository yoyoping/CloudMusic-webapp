<template>
  <header :class="{noBg: $route.meta.headerbg === 'no'}" v-show="!$route.meta.noHeader">
    <a @click.stop="goback" class="back" v-if="$route.meta.goback === 'prev'">
      <i class="iconfont zuojiantou"></i>
    </a>
    <router-link :to="$route.meta.goback" v-if="$route.meta.goback && $route.meta.goback !== 'prev'" class="back">
      <i class="iconfont zuojiantou"></i>
    </router-link>
    <h1 v-if="$route.meta.headerbg !== 'no'">{{title}}</h1>
    <span class="toplay" @click="SET_OPENPLAYER(true)"><i class="iconfont zhengzaibofang"></i></span>
  </header>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      prevPath: "", // 上一页的地址
      prevName: "" // 上一页的名称
    };
  },
  computed: {
    ...mapState(["title"])
  },
  methods: {
    ...mapMutations(["SET_OPENPLAYER"]),
    goback() {
      if (this.prevPath && this.prevName) {
        this.$router.go(-1);
      } else {
        this.$router.push("/");
      }
    }
  },
  watch: {
    $route(newVal, oldVal) {
      if (localStorage.prevPath) {
        this.prevPath = localStorage.prevPath;
      }
      localStorage.prevPath = oldVal.fullPath;
      this.prevPath = oldVal.fullPath;
      this.prevName = oldVal.name;
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  height: 0.9rem;
  color: #fff;
  background-color: #d44439;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  &.noBg {
    background-color: transparent;
  }
  h1 {
    font-size: 0.36rem;
    color: #fff;
    text-align: center;
    line-height: 0.9rem;
  }
}
.toplay {
  display: block;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0.3rem;
  color: #fff;
  text-align: center;
  line-height: 0.9rem;
}
.iconfont {
  font-size: 0.5rem;
}
.back {
  width: 0.6rem;
  display: block;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0.2rem;
  color: #fff;
  text-align: center;
  line-height: 0.9rem;
}
</style>
