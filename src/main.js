import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import fastclick from "fastclick";
import lodash from "lodash";
import rem from "./util/rem";
import api from "./util/api";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false;

fastclick.attach(document.body);

Vue.use(VueLazyload, {
  loading: require("./assets/images/default.png")
});

Vue.prototype._ = lodash;

Vue.prototype.$api = api;

rem();
window.onresize = () => {
  rem();
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
