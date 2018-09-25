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
            isKeep: true
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
            isKeep: true
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
          component: _import_(`top/Topdetail`)
        }
      ]
    }
  ]
});
