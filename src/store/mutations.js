import { singer } from "@/util";
import _ from "lodash/array";

const mutations = {
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
    if (index !== -1) {
      // 如果存在就删掉重新添加到数组最后
      state.playList.splice(index, 1);
    }
    state.playList.push(res);
    console.log(state.playList);
  },
  // 设置当前播放播放歌曲的ID
  SET_MUSICID(state, id) {
    state.currentSongId = id; // 当前歌曲id
  },
  // 设置歌词
  SET_LYRIC(state, res) {
    state.lyric = res;
  },
  // 加入/取消 收藏歌曲
  ACTION_COLLECT(state, id) {
    const collectList = state.collectList
    // 判断当前歌曲是否存在于收藏列表中
    if(collectList.includes(id)) {
      collectList.splice(collectList.indexOf(id), 1)
    } else {
      collectList.push(id)
    }
  }
};
export default mutations;