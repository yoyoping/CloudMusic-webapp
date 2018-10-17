<template>
  <div>
    <div class="banner">
      <!-- <div class="slide-render-view">
        <div class="slide-wrapper">
          <div class="slide-content">
            <Slider ref="slide" :autoPlay="true" :loop="true" :showDot="true" :interval="4000" :threshold="0.3" :speed="400">
              <div v-for="(item, index) in banner" :key="index">
                <a href="javascript:;">
                  <img v-lazy="item.picUrl">
                </a>
              </div>
            </Slider>
          </div>
        </div>
      </div> -->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <img v-lazy="item.picUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <nav>
      <a href="javascript:;">
        <span>
          <i class="iconfont rili"></i>
        </span>
        每日推荐
      </a>
      <a href="javascript:;">
        <span>
          <i class="iconfont dianyingzhiye-gequbang"></i>
        </span>
        推荐歌单
      </a>
      <router-link to="/toplist">
        <span>
          <i class="iconfont paixingbang"></i>
        </span>
        排行榜
      </router-link>
    </nav>
    <div class="songCls">
      <p class="title"><a href="javascript:;">推荐歌单 <i class="iconfont youjiantou"></i></a></p>
      <ul>
        <li v-for="(item, index) in personalizedList" :key="index">
          <router-link :to="`/playlist/${item.id}`">
            <img v-lazy="item.picUrl" alt="">
            <p>{{item.name}}</p>
            <span><i class="iconfont erji"></i>{{item.playCount | formatNum}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="songCls">
      <p class="title"><a href="javascript:;">最新音乐 <i class="iconfont youjiantou"></i></a></p>
      <ul>
        <li v-for="(item, index) in newSongList" :key="index" @click="play(item.id)">
          <a>
            <img v-lazy="item.picUrl" alt="">
            <p class="songName">{{item.name}}</p>
            <p class="singer">{{item.singer}}</p>
          </a>
        </li>
        <li v-if="newSongList.length % 3 === 2"></li>
      </ul>
    </div>
  </div>
</template>
<script>
import Header from '@/views/Header.vue'
import Scroll from '@/components/scroll/Index' 
import Slider from '@/components/slider/Index' 
import { mapActions, mapMutations } from 'vuex'
import { Swipe, SwipeItem } from 'vant'
export default {
  components: {
    Header,
    Scroll,
    Slider,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      banner: [], // 初始化8个空的banner对象,(如果不初始化会导致slide异常)
      personalizedList: [], // 推荐歌单
      newSongList: [] // 最新音乐
    };
  },
  created() {
    this.getBanner()
    this.personalized()
    this.newSong()
  },
  filters: {
    formatNum (val) {
      if (val > 100000) {
        return ` ${Math.round(val / 10000)}万 `
      } else {
        return ` ${parseInt(val)} `
      }
    }
  },
  methods: {
    ...mapMutations(['SET_OPENPLAYER']),
    ...mapActions(['getMusic']),
    /**
     * 获取banner信息
     */
    async getBanner() {
      const params = {
        url: 'banner'
      }
      const res = await this.$axios(params)
      this.banner = res.banners;
    },
    /**
     * 获取推荐歌单
     */
    async personalized() {
      const params = {
        url: `personalized`
      }
      const res = await this.$axios(params)
      this.personalizedList = res.result.splice(0, 6)
    },
    async newSong() {
      const params = {
        url: `newSong`
      }
      const res = await this.$axios(params)
      const list = res.result
      this.newSongList = list.map(item => {
        const obj = {
          id: item.id,
          picUrl: item.song.album.picUrl,
          name: item.name,
          singer: item.song.album.artists[0].name
        }
        return obj
      })
    },
    play (id) {
      this.getMusic(id)
      this.SET_OPENPLAYER(true)
    }
  },
  watch: {
    index() {
      this.$refs.slide.update();
    }
  }
};
</script>
<style lang="scss" scoped>
.banner {
  width: 100%;
  background-color: #d44439;
  position: relative;
  height: 17vh;
  margin-bottom: 10vh;
  .van-swipe{
    width: 94vw;height: 3rem;position: absolute;
    left: 3vw;
    border-radius: 0.1rem;
    overflow: hidden;
  }
  .van-swipe-item{
    border-radius: 0.1rem;overflow: hidden;
    img{
      width: 100%;border-radius: 0.1rem;overflow: hidden;
    }
  }
}

nav{
  width: 100%;display: flex;
  a{
    display: block;flex: 1;-webkit-box-flex: 1;text-align: center;
  }
  span{
    display: block;width: 0.9rem;background-color: #d44439;margin: 0 auto 0.1rem;height: 0.9rem;
    border-radius: 50%;color: #fff;line-height: 0.9rem;
  }
  .iconfont{
    font-size: 0.45rem;
    
  }
}

.songCls{
  margin-top: 0.3rem;widows: 100vw;padding: 0 1vw;
  ul{
    display: flex; flex-flow: row wrap;width: 100%;justify-content: space-between;
  }
  li{
    width: 32vw;overflow: hidden;position: relative;margin-bottom: 0.12rem;padding-bottom: 0.1rem;
    border-radius: 0.1rem;
    p{
      width: 100%;padding: 0 0.1rem;box-sizing: border-box;height: 0.67rem;overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //将元素设为盒子伸缩模型显示
      -webkit-box-orient: vertical; //伸缩方向设为垂直方向
      -webkit-line-clamp: 2;  //超出3行隐藏，并显示省略号
    }
  }
  .title{
    margin-bottom: 0.2rem;
    a{
      font-size: 0.28rem;color: #222;font-weight: 450
    }
  }
  img{
    width: 100%;height: 32vw;margin: 0;padding: 0;border-radius: 0.1rem;
  }
  span{
    position: absolute;top: 0.1rem;right: 0.1rem;color: #fff;
  }
  .songName{
    height: 0.34rem;
  }
  .singer{
    height: 0.4rem;color: #666;font-size: 0.2rem;
  }
}


.slider-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.slide-render-view {
  width: 94vw;
  height: 2.8rem;
  position: absolute;
  left: 3vw;
  border-radius: 0.1rem;
  overflow: hidden;
  .slide-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 40%;
    overflow: hidden;
    .slide-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .group {
    margin-bottom: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    // border-radius: $radius-size-medium;
    background: #fff;
    .item {
      height: 3.2rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .item:last-child {
      border-bottom: none;
    }
    .item:nth-child(even) {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
}
.free-option {
  .button-container {
    button {
      padding: 5px;
      border-radius: 5px;
      background-color: #fff;
      outline: none;
    }
    .active {
      background-color: #3b99fc;
      border: #fff 1px solid;
      color: #fff;
    }
    .change-button {
      background-color: #3b99fc;
      padding: 5px 10px;
      color: #fff;
    }
  }
}
</style>
