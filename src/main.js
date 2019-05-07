import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import fastclick from "fastclick";
import lodash from "lodash";
import rem from "./util/rem";
import axios from "./fetch/axios";
import VueLazyload from "vue-lazyload";
import "@/util/interceptor";
import animate from "animate.css";
import Cookies from "js-cookie";

Vue.config.productionTip = false;

fastclick.attach(document.body);

Vue.use(animate);

Vue.use(VueLazyload, {
  loading: require("./assets/images/default.png")
});

Vue.prototype._ = lodash;

Vue.prototype.$axios = axios;

rem();
window.onresize = () => {
  rem();
};

// 如果当前登陆状态为false,清空当前所有的本地存储，sessionStorage除外。
if (!Cookies.get("loginStatus")) {
  Cookies.remove("uid");
  Cookies.remove("loginStatus");
  localStorage.clear();
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
