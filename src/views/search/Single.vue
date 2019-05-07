<template>
  <div>
    <van-loading class="customize" color="#d44439" v-show="resultLoing" />
    <ul class="content" v-show="!resultLoing">
      <li class="van-hairline--bottom" v-for="(item, index) in list" :key="index"  @click="play(item.id)">
        <dl>
          <dt class="van-ellipsis" :class="{red: item.id === currentSongId}"><i class="iconfont laba1" v-if="item.id === currentSongId"></i>{{item.name}}</dt>
          <dd class="van-ellipsis">{{item.artists | arName}} - {{item.album.name}}</dd>
          <dd class="van-ellipsis" v-if="item.alias.length">{{item.alias | alias}}</dd>
        </dl>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { Loading } from "vant";
export default {
  props: {
    resultLoing: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {
    [Loading.name]: Loading
  },
  computed: {
    ...mapState(["currentSongId"])
  },
  filters: {
    arName(arr) {
      const name = arr.map(item => {
        return item.name;
      });
      return name.join(`/`);
    },
    alias(arr) {
      const name = arr.join("/");
      return name;
    }
  },
  methods: {
    ...mapActions(["getMusic"]),
    ...mapMutations(["SET_OPENPLAYER"]),
    play(id) {
      this.getMusic(id);
      this.SET_OPENPLAYER(true);
    }
  }
};
</script>

<style lang="scss" scoped>
dl,
dt,
dd {
  margin: 0;
}
li {
  padding: 0.1rem 0 0.15rem;
  height: auto;
}
dt {
  font-size: 0.3rem;
  &.red {
    color: #d44439;
  }
  i {
    margin-right: 0.15rem;
  }
}
dd {
  color: #999;
}
dl {
  width: 80%;
}
</style>
