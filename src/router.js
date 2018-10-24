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
            toLogin: true
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
            goback: "/"
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
            goback: "/toplist"
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
      component: () => import(`./App.vue`),
      redirect: "/login",
      children: [
        {
          path: "/login",
          name: "login",
          component: _import_(`login/Index`),
          meta: {
            menuName: "mine",
            goback: "/"
          }
        }
      ]
    }
  ]
});
