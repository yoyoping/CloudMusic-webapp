import Cookies from "js-cookie";
import storage from "good-storage";
const state = {
  songUrl: ``, // 歌曲播放地址
  currentSongId: ``, // 当前播放歌曲id
  songDetail: {}, // 当前歌曲详情
  openPlayer: false, // 是否打开播放页
  firstBanner: ``, // 第一张banner图
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
  noLyric: false, // 是否无歌词（默认有）
  collectList: [], // 收藏列表（歌曲的id）
  uid: Cookies.get(`uid`), // 用户id
  loadState: true, // 加载状态（默认加载中）
  minePlayList: [], // 我的的音乐歌单
  likePlayList: storage.get(`likeList`) || [] // 喜欢的音乐id数组
};

export default state;
