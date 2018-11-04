/**
 * meta属性说明
 * isKeep：是否需要缓存
 * menuName：当前路由属于哪个版块
 * toLogin：是否需要登录才能访问
 * needLoading：是否需要加载中状态
 * noTabbar：是否需要tabbar
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
      path: "",
      name: "",
      component: _import_(`Layout`),
      redirect: "/",
      children: [
        {
          path: "/",
          name: "home",
          component: _import_(`home/Index`),
          meta: {
            isKeep: true,
            menuName: "music"
          }
        }
      ]
    },
    {
      path: "",
      name: "",
      component: _import_(`Layout`),
      redirect: "/recommendSong",
      children: [
        {
          path: "/recommendSong",
          name: "recommendSong",
          component: _import_(`recommendSong/Index`),
          meta: {
            isKeep: true,
            menuName: "music",
            toLogin: true,
            needLoading: true
          }
        }
      ]
    },
    {
      path: "",
      name: "",
      component: _import_(`Layout`),
      redirect: "/toplist",
      children: [
        {
          path: "/toplist",
          name: "toplist",
          component: _import_(`top/TopList`),
          meta: {
            isKeep: true,
            menuName: "music",
            goback: "/",
            needLoading: true
          }
        }
      ]
    },
    {
      path: "",
      name: "",
      component: _import_(`Layout`),
      redirect: "/top/:idx",
      children: [
        {
          path: "/top/:idx",
          name: "top",
          component: _import_(`playlist/Index`),
          meta: {
            menuName: "music",
            goback: "/toplist",
            needLoading: true
          }
        }
      ]
    },
    {
      path: "",
      name: "",
      component: _import_(`Layout`),
      redirect: "/playlist",
      children: [
        {
          path: "/playlist/:id",
          name: "playlist",
          component: _import_(`playlist/Index`),
          meta: {
            menuName: "music",
            goback: "/"
          }
        }
      ]
    },
    {
      path: "",
      name: "",
      component: _import_(`Layout`),
      redirect: "/mine",
      children: [
        {
          path: "/mine",
          name: "mine",
          component: _import_(`mine/Index`),
          meta: {
            menuName: "mine",
            headerbg: "no",
            toLogin: true
          }
        }
      ]
    },
    {
      path: "",
      name: "",
      component: _import_(`Layout`),
      redirect: "/login",
      children: [
        {
          path: "/login",
          name: "login",
          component: _import_(`login/Index`),
          meta: {
            menuName: "mine",
            noTabbar: true,
            goback: "/"
          }
        }
      ]
    },
    {
      path: "",
      name: "",
      component: _import_(`Layout`),
      redirect: "/search",
      children: [
        {
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
    },
  ]
});
