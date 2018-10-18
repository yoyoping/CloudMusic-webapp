import Router from "@/router";
import Cookie from "js-cookie";
Router.beforeEach((to, from, next) => {
  if (to.name === "mine") {
    // 判断如果是进入我的页面并且没有登录就跳转到登录页
    if (!Cookie.get("loginStatus")) {
      next("/login");
    }
  }
  next();
});
