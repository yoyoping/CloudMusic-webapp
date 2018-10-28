import axios from "@/util/axios";
/**
 * 通过id获取音乐url
 * @param {*} id id
 */
export const getMusic = async ({ commit }, id) => {
  commit(`SET_MUSICID`, id);
  // 获取歌曲url
  const paramsMusicUrl = {
    url: `musicUrl`,
    id: id
  };
  const musicurl = await axios(paramsMusicUrl);
  commit(`SET_SONGURL`, musicurl.data[0].url);
  // 获取歌曲信息
  const paramsSongDetail = {
    url: `songDetail`,
    ids: id
  };
  const songDetail = await axios(paramsSongDetail);
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
    url: `musicLyric`,
    id: id
  };
  const res = await axios(params);
  if (!res.nolyric) {
    commit(`SET_LYRIC`, res.lrc.lyric);
  }
};
