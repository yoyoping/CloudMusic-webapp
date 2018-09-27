import Vue from "vue";
import Vuex from "vuex";
import api from "@/util/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    songUrl: ``, // 歌曲播放地址
    currentSongId: ``, // 当前播放歌曲id
    songDetail: {}, // 当前歌曲详情
    songBgPic: `` // 歌曲的背景图片
  },
  mutations: {
    // 修改歌曲播放地址
    SET_SONGURL(state, res) {
      state.songUrl = res;
    },
    // 获取歌曲详情
    GET_SONGDEATIL(state, res) {
      state.songDetail = res;
      state.songBgPic = res.songs[0].al.picUrl;
    }
  },
  actions: {
    /**
     * 通过id获取音乐url
     * @param {*} id id
     */
    getMusic({ commit, state }, id) {
      state.currentSongId = id; // 当前歌曲id
      (async () => {
        // 获取歌曲url
        const musicurl = await api.musicUrl({
          id: id
        });
        commit(`SET_SONGURL`, musicurl.data[0].url);
        // 获取歌曲信息
        const songDetail = await api.songDetail({
          ids: id
        });
        commit(`GET_SONGDEATIL`, songDetail);
      })();
    }
  }
});
