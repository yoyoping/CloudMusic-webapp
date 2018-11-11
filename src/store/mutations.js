import { singer } from "@/util";
import _ from "lodash/array";

const mutations = {
  // 修改歌曲播放地址
  [`SET_SONGURL`](state, res) {
    state.songUrl = res;
  },
  // 获取歌曲详情
  [`GET_SONGDEATIL`](state, res) {
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
  // 设置当前是否打开播放页
  [`SET_OPENPLAYER`](state, res) {
    state.openPlayer = res;
  },
  // 设置当前播放的歌曲的信息
  [`SET_MUSICDETAIL`](state, res) {
    Object.assign(state.musicDetail, res);
  },
  [`SET_PLAYLIST`](state, res) {
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
  [`SET_MUSICID`](state, id) {
    state.currentSongId = id; // 当前歌曲id
  },
  // 设置歌词
  [`SET_LYRIC`](state, res) {
    if (res === `noLyric`) {
      state.noLyric = true;
    } else {
      state.lyric = res;
      state.noLyric = false;
    }
  },
  // 加入/取消 收藏歌曲
  [`ACTION_COLLECT`](state, id) {
    const collectList = state.collectList
    // 判断当前歌曲是否存在于收藏列表中
    if (collectList.includes(id)) {
      collectList.splice(collectList.indexOf(id), 1)
    } else {
      collectList.push(id)
    }
  },
  // 设置加载状态
  [`SET_LOAD`](state, res) {
    state.loadState = res;
  },
  // 我的歌单列表
  [`SET_MINEPLAYLIST`](state, res) {
    state.minePlayList = res;
  },
  // 我喜欢的音乐id数组
  [`SET_LIKEPLAYLIST`](state, res) {
    state.likePlayList = res;
  },
  // 首张banner图
  [`SET_FIRSTBANNER`](state, res) {
    state.firstBanner = res;
  },
  // 当前播放歌曲的评论数
  [`SET_COMMENTCOUNT`](state, count) {
    state.commentCount = count;
  },
  // 头部标题
  [`SET_TITLE`](state, res) {
    state.title = res || 'CLOUD MUSIC';
  }
};
export default mutations;
