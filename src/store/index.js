import Vue from "vue";
import Vuex from "vuex";
import axios from "@/util/axios";
import { singer } from "@/util";
import _ from "lodash/array";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    songUrl: ``, // 歌曲播放地址
    currentSongId: ``, // 当前播放歌曲id
    songDetail: {}, // 当前歌曲详情
    openPlayer: false, // 是否打开播放页
    musicDetail: {
      name: ``,
      singer: ``,
      picUrl: ``
    },
    // 播放列表
    playList: [
      {
        id: ``,
        musicurl: ``, // 歌曲播放地址
        name: ``, // 歌名
        singer: ``, // 歌手名
        pic: `` // 歌曲图片
      }
    ]
  },
  mutations: {
    // 修改歌曲播放地址
    SET_SONGURL(state, res) {
      state.songUrl = res;
    },
    // 获取歌曲详情
    GET_SONGDEATIL(state, res) {
      state.songDetail = res;
      const song = res.songs[0];
      const detail_ = {
        name: song.name,
        picUrl: song.al.picUrl,
        singer: singer(song.ar)
      };
      this.commit(`SET_MUSICDETAIL`, detail_);
      // 添加到播放记录里面
      const param = {
        id: song.id,
        musicurl: res.musicurl_,
        name: song.name,
        singer: singer(song.ar),
        pic: song.al.picUrl
      };
      this.commit(`SET_PLAYLIST`, param);
    },
    // 设置当前是否正在播放歌曲
    SET_OPENPLAYER(state, res) {
      state.openPlayer = res;
    },
    // 设置当前播放的歌曲的信息
    SET_MUSICDETAIL(state, res) {
      Object.assign(state.musicDetail, res);
    },
    SET_PLAYLIST(state, res) {
      if (!state.playList[0].id) {
        state.playList = [];
      }
      const index = _.findIndex(state.playList, { id: res.id });
      // 判断当前播放的歌曲是否存在记录列表中
      if (index !== -1) { // 如果存在就删掉重新添加到数组最后
        state.playList.splice(index, 1);
      }
      state.playList.push(res);
      console.log(state.playList);
    },
    SET_MUSICID(state, id) {
      state.currentSongId = id; // 当前歌曲id
    }
  },
  actions: {
    /**
     * 通过id获取音乐url
     * @param {*} id id
     */
    getMusic({ commit }, id) {
      commit(`SET_MUSICID`, id);
      (async () => {
        // 获取歌曲url
        const paramsMusicUrl = {
          url: `musicUrl`,
          id: id
        }
        const musicurl = await axios(paramsMusicUrl);
        commit(`SET_SONGURL`, musicurl.data[0].url);
        // 获取歌曲信息
        const paramsSongDetail = {
          url: `songDetail`,
          ids: id
        }
        const songDetail = await axios(paramsSongDetail);
        console.log(songDetail);
        songDetail.musicurl_ = musicurl.data[0].url; // 将当前歌曲地址添加到详情里面
        commit(`GET_SONGDEATIL`, songDetail);
      })();
    }
  }
});
