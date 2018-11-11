import Router from "@/router";
import Cookie from "js-cookie";
import { Toast } from "vant";
Router.beforeEach((to, from, next) => {
  if (to.meta.toLogin) {
    // 判断如果是进入我的页面并且没有登录就跳转到登录页
    if (!Cookie.get("loginStatus")) {
      next("/login");
    }
  }
  if (to.name === 'login' && Cookie.get("loginStatus")) {
    Toast.fail('当前已经登陆');
  }
  // 将加载状态设置为true
  // 首次进入Router.app.$store为undefined
  if (Router.app.$store) {
    Router.app.$store.commit('SET_LOAD', true)
    console.log(Router.app.$store)
  }
  next();
});
