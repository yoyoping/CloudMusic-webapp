import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import fastclick from "fastclick";
import lodash from "lodash";
import rem from "./util/rem";
import axios from "./util/axios";
import VueLazyload from "vue-lazyload";
import "@/util/interceptor";
import animate from "animate.css";

Vue.config.productionTip = false;

fastclick.attach(document.body);

Vue.use(animate)

Vue.use(VueLazyload, {
  loading: require("./assets/images/default.png")
});

Vue.prototype._ = lodash;

Vue.prototype.$axios = axios;

rem();
window.onresize = () => {
  rem();
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
