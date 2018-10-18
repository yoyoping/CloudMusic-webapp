import Cookies from "js-cookie";
const state = {
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
  ],
  lyric: ``, // 歌词
  collectList: [], // 收藏列表（歌曲的id）
  uid: Cookies.get("uid") // 用户id
};

export default state;
