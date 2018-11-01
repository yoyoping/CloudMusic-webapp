import axios from "@/util/axios";
import Cookies from "js-cookie";
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
  getLyric({ commit }, id);
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
    urlCode: 'CD012',
    uid: Cookies.get('uid')
  }
  const res = await axios(params)
  let list = {
    mine: [], // 我创建的
    collection: [] // 收藏歌单
  }
  res.playlist.forEach(item => {
    // 判断是自己的创建的歌单
    if (item.creator.userId === Number(Cookies.get('uid'))){
      list.mine.push(item)
    } else {
      list.collection.push(item)
    }
  });
  commit(`SET_MINEPLAYLIST`, list)
  likePlayList({ commit }, list.mine[0].id)
}

/**
 * 获取我喜欢的音乐列表
 */
export const likePlayList = async ({ commit }, likeId) => {
  const params = {
    urlCode: `CD009`,
    id: likeId
  }
  const res = await axios(params)
  console.log(res)
  const list = res.playlist.tracks.map(item => item.id)
  console.log(list)
  commit(`SET_LIKEPLAYLIST`, list)
}
