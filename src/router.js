/**
 * meta属性说明
 * isKeep：是否需要缓存
 * menuName：当前路由属于哪个版块
 * toLogin：是否需要登录才能访问
 * needLoading：是否需要加载中状态
 * noTabbar：是否需要tabbar
 * scroll: 值为true就证明需要保留滚动位置
 */

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const _import_ = file => () => import(`./views/${file}.vue`);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Layout",
      component: _import_(`Layout`),
      redirect: "/",
      children: [
        { // 首页
          path: "/",
          name: "home",
          component: _import_(`home/Index`),
          meta: {
            isKeep: true,
            menuName: "music"
          }
        },
        { // 每日推荐
          path: "/recommendSong",
          name: "recommendSong",
          component: _import_(`recommendSong/Index`),
          meta: {
            isKeep: true,
            menuName: "music",
            toLogin: true,
            needLoading: true
          }
        },
        { // 排行榜
          path: "/toplist",
          name: "toplist",
          component: _import_(`top/TopList`),
          meta: {
            isKeep: true,
            menuName: "music",
            goback: "/",
            needLoading: true
          }
        },
        { // 具体排行榜榜单
          path: "/top/:idx",
          name: "top",
          component: _import_(`playlist/Index`),
          meta: {
            menuName: "music",
            goback: "/toplist",
            needLoading: true
          }
        },
        { // 歌单
          path: "/playlist/:id",
          name: "playlist",
          component: _import_(`playlist/Index`),
          meta: {
            menuName: "music",
            goback: "/"
          }
        },
        { // 我的
          path: "/mine",
          name: "mine",
          component: _import_(`mine/Index`),
          meta: {
            menuName: "mine",
            headerbg: "no",
            toLogin: true
          }
        },
        { // 登录
          path: "/login",
          name: "login",
          component: _import_(`login/Index`),
          meta: {
            menuName: "mine",
            noTabbar: true,
            goback: "/"
          }
        },
        { // 搜索
          path: "/search",
          name: "search",
          component: _import_(`search/Index`),
          meta: {
            menuName: "search",
            headerbg: "no",
            isKeep: true,
            noHeader: true
          }
        }
      ]
    }
  ],
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (!to.meta.scroll) {
        return { x: 0, y: 0 };
      }
    }
  }
});
