// 集中管理路由，所有的接口地址：
// 1.整个应用用到了哪些接口一目了然
// 2.接口地址可能变化，方便管理
import axios from "./axios";
// 参数data是请求接口的参数
export default {
  // 获取banner
  banner: data => {
    return axios(`/banner`, data);
  },
  // 获取推荐歌单
  personalized: data => {
    return axios(`/personalized`, data);
  },
  // 获取最新音乐
  newSong: data => {
    return axios(`/personalized/newsong`, data);
  },
  // 获取专辑详情
  album: data => {
    return axios(`/album`, data);
  },
  // 获取歌曲详情
  songDetail: data => {
    return axios(`/song/detail`, data);
  },
  // 获取音乐url
  musicUrl: data => {
    return axios(`/music/url`, data);
  }
};
