// 集中管理路由，所有的接口地址：
// 1.整个应用用到了哪些接口一目了然
// 2.接口地址可能变化，方便管理
export default {
  // banner
  banner: `/banner`,
  // 推荐歌单
  personalized: `/personalized`,
  // 最新音乐
  newSong: `/personalized/newsong`,
  // 专辑详情
  album: `/album`,
  // 歌曲详情
  songDetail: `/song/detail`,
  // 音乐url
  musicUrl: `/music/url`,
  // 歌曲歌词
  musicLyric: `/lyric`,
  // 排行榜
  musicTop: `/top/list`,
  // 歌单详情
  songList: `/playlist/detail`
};
