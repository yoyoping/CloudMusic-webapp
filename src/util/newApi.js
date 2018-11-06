// 集中管理请求地址，所有的接口地址：
// 1.整个应用用到了哪些接口一目了然
// 2.接口地址可能变化，方便管理
// 3.所有请求都是用get明文请求，因为网易云提供的api就是这样的

const Api = {
  CD001: {title: `Banner`, url: `/banner` },
  CD002: { title: `推荐歌单`, url: `/personalized` },
  CD003: { title: `最新音乐`, url: `/personalized/newsong` },
  CD004: { title: `专辑详情`, url: `/album` },
  CD005: { title: `歌曲详情`, url: `/song/detail` },
  CD006: { title: `音乐url`, url: `/song/url` },
  CD007: { title: `歌曲歌词`, url: `/lyric` },
  CD008: { title: `排行榜`, url: `/top/list` },
  CD009: { title: `歌单详情`, url: `/playlist/detail` },
  CD010: { title: `登录`, url: `/login/cellphone` },
  CD011: { title: `用户详情`, url: `/user/detail` },
  CD012: { title: `获取用户歌单`, url: `/user/playlist` },
  CD013: { title: `获取每日推荐歌曲`, url: `/recommend/songs` },
  CD014: { title: `获取每日推荐歌单`, url: `/recommend/resource` },
  CD015: { title: `热搜`, url: `/search/hot` },
  CD016: { title: `搜索`, url: `/search` },
  CD017: { title: `加入/取消喜欢音乐`, url: `/like` },
  CD018: { title: `获取歌曲评论`, url: `/comment/music` }
};

export default Api;
