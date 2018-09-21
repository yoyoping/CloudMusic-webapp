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
          component: _import_(`home/Index`)
        }
      ]
    },
    {
      path: "play",
      name: "",
      component: _import_(`Layout`),
      redirect: "/play",
      children: [
        {
          path: "/play",
          name: "play",
          component: _import_(`play/Index`)
        }
      ]
    }
  ]
});
