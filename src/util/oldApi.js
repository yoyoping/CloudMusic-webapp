// 集中管理路由，所有的接口地址：
// 1.整个应用用到了哪些接口一目了然
// 2.接口地址可能变化，方便管理
import axios from "./axios";
const url = {
  banner: `/banner`, // banner
  personalized: `/personalized`, // 推荐歌单
  newSong: `/personalized/newsong`, // 最新音乐
  album: `/album`, // 专辑详情
  songDetail: `/song/detail`, // 歌曲详情
  musicUrl: `/music/url`, // 音乐url
  musicLyric: `/lyric`, // 歌曲歌词
  musicTop: `/top/list`, // 排行榜
  songList: `/playlist/detail`, // 歌单详情
  // 测试post
  test: {
    url: `/test`,
    type: `post`
  }
};
let Api = {};
// 循环生成axios请求
Object.keys(url).forEach(item => {
  // 参数data是请求接口的参数
  Api[item] = data => {
    // 判断是否是post请求
    if (typeof url[item] === `object` && Api[item].type === `post`) {
      return axios(url[item].url, data, `post`);
    }
    // get请求
    return axios(url[item], data);
  }
});

export default Api;
