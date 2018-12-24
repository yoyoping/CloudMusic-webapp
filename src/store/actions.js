import axios from "@/fetch/axios";
import Cookies from "js-cookie";
import storage from "good-storage";
import { Toast } from "vant";
/**
 * 通过id获取音乐url
 * @param {*} id id
 */
export const getMusic = async ({ commit }, id) => {
  commit(`SET_MUSICID`, id);
  // 获取歌曲url
  const paramsMusicUrl = {
    urlCode: `CD006`,
    id: id
  };
  const musicurl = await axios(paramsMusicUrl);
  commit(`SET_SONGURL`, musicurl.data[0].url);
  // 获取歌曲信息
  const paramsSongDetail = {
    urlCode: `CD005`,
    ids: id
  };
  const songDetail = await axios(paramsSongDetail);
  console.log(songDetail);
  songDetail.musicurl_ = musicurl.data[0].url; // 将当前歌曲地址添加到详情里面
  commit(`GET_SONGDEATIL`, songDetail);
  // 歌词
  getLyric({ commit }, id);
  // 歌曲评论
  commentList({ commit }, id);
  
};

/**
 * 通过id获取歌词
 * @param {Number} id id
 */
export const getLyric = async ({ commit }, id) => {
  const params = {
    urlCode: `CD007`,
    id: id
  };
  const res = await axios(params);
  if (!res.nolyric) {
    commit(`SET_LYRIC`, res.lrc.lyric);
  } else {
    commit(`SET_LYRIC`, "noLyric");
  }
};

/**
 * 获取我的歌单列表
 */
export const getplaylist = async ({ commit }) => {
  const params = {
    urlCode: `CD012`,
    uid: Cookies.get(`uid`)
  }
  const res = await axios(params)
  let list = {
    mine: [], // 我创建的
    collection: [] // 收藏歌单
  }
  res.playlist.forEach(item => {
    // 判断是自己的创建的歌单
    if (item.creator.userId === Number(Cookies.get(`uid`))) {
      list.mine.push(item);
    } else {
      list.collection.push(item);
    }
  });
  commit(`SET_MINEPLAYLIST`, list);
  likePlayList({ commit }, list.mine[0].id);
  // 将喜欢的音乐歌单id存在本地，方便后面调用歌单使用
  localStorage.likeListId = list.mine[0].id;
};

/**
 * 获取我喜欢的音乐列表
 */
export const likePlayList = async ({ commit }, likeId) => {
  const params = {
    urlCode: `CD009`,
    id: likeId
  };
  const res = await axios(params);
  const list = res.playlist.tracks.map(item => item.id);
  commit(`SET_LIKEPLAYLIST`, list);
  storage.set(`likeList`, list);
}

/**
 * 加入/取消 喜欢歌曲
 * id: 音乐ID
 * like: true - 加入喜欢，false - 取消喜欢
 */
export const likeSong = async ({ commit }, [id, like]) => {
  const timestamp = new Date().getTime();
  const params = {
    urlCode: `CD017`,
    id: id,
    like: like,
    timestamp: timestamp
  };
  if (!like) {
    delete params.like
  }
  await axios(params);
  if (like) {
    Toast.success(`已加入喜欢列表`);
  } else {
    Toast.success(`已取消喜欢`);
  }
  likePlayList({ commit }, localStorage.likeListId);
};

/**
 * 获取歌曲评论
 */
export const commentList = async ({ commit }, id) => {
  const params = {
    urlCode: `CD018`,
    id: id
  }
  const res = await axios(params)
  let count = res.total
  if (count > 10000000) {
    count = '1000w+'
  }
  if (count > 1000000) {
    count = '100w+'
  }
  if (count > 100000) {
    count = '10w+'
  }
  if (count > 10000) {
    count = '1w+'
  }
  if (count > 1000){
    count = '999+'
  }
  commit('SET_COMMENTCOUNT', count)
}
