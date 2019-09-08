import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import "./registerServiceWorker";

import store from "./store";
import routes from "./routes";

require("./filters");

Vue.config.productionTip = false;

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
router.beforeEach((to, from, next) => {
  if (to.name != "login" && store.state.auth.username === undefined) {
    next("/login");
  } else {
    next();
  }
});

// Dirty fix for lazyload. Remove when updated
Vue.use({
  install() {
    Vue.prototype.destroy = Vue.prototype.$destroy;
  }
});

import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, { lazyComponent: true });

import VueResource from "vue-resource";
Vue.use(VueResource);

const auth = btoa(store.state.auth.username + ":" + store.state.auth.password);

Vue.http.headers.common["Authorization"] = "Basic " + auth;

import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "./assets/css/style.scss";

Vue.use(Buefy);

import InfiniteLoading from "vue-infinite-loading";
Vue.use(InfiniteLoading, { system: { throttleLimit: 500 } });

if (process.env["NODE_ENV"] === "development") {
  Vue.http.options.root = "http://localhost:5000/api/v1";
} else {
  Vue.http.options.root = "https://broad.mskog.com/api/v1";
}

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
