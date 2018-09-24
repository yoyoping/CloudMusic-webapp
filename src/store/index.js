import Vue from "vue";
import Vuex from "vuex";
import api from "@/util/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    songUrl: `` // 歌曲播放地址
  },
  mutations: {
    // 修改歌曲播放地址
    SET_SONGURL(state, res) {
      state.songUrl = res;
    }
  },
  actions: {
    /**
     * 通过id获取音乐url
     * @param {*} res id
     */
    getMusicUrl({ commit }, res) {
      api
        .musicUrl({
          id: res
        })
        .then(res => {
          commit(`SET_SONGURL`, res.data[0].url);
        });
    }
  }
});
