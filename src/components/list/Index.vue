<template>
  <div class="content">
		<h2>
			<i class="iconfont bofang"></i>
			播放全部<span>(共{{trackCount}}首)</span>
		</h2>
		<ul>
			<li v-for="(item, index) in list" :key="item.id" :class="{active: item.id === currentSongId}">
				<label class="red" v-if="item.id === currentSongId"><i class="iconfont laba1"></i></label>
				<label v-else :class="{red: index < 3}">{{index &lt; 9 ? `0${index + 1}` : (index + 1)}}</label>
				<div @click="play(item.id)">
					<h3 class="van-ellipsis" :class="{red: item.id === currentSongId}">{{item.name}}<span class="des" v-if="item.alia[0]"> ({{item.alia[0]}})</span></h3>
					<p class="van-ellipsis">{{item.ar | arName}} - {{item.al.name}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  props: {
    trackCount: {
      type: Number,
      required: true,
      default: 0
    },
    list: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    }
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

<style lang="scss">
.content {
  width: 100%;
  background-color: #fff;
  border-radius: 0.2rem;
  position: relative;
  top: -29vw;
  h2 {
    font-size: 0.3rem;
    padding: 0.17rem 0.14rem;
    .iconfont {
      font-size: 0.37rem;
      position: relative;
      top: 0.03rem;
      margin-right: 0.05rem;
    }
    span {
      font-size: 0.27rem;
      color: #999;
      margin-left: 0.04rem;
    }
  }
  li {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    height: 1rem;
    &.active {
      background-color: #eee;
    }
    label {
      width: 10vw;
      height: 100%;
      line-height: 1rem;
      text-align: center;
      font-size: 0.3rem;
      color: #999;
    }
    .red {
      color: #d44439;
    }
    div {
      width: 90vw;
      border-top: 0.01rem solid #ddd;
      height: 100%;
      padding: 0.1rem 0;
      box-sizing: border-box;
    }
    h3 {
      font-size: 0.3rem;
      overflow: hidden;
      .des {
        color: #999;
      }
    }
    p {
      color: #999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
