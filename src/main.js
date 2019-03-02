import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import "./registerServiceWorker";

import store from "./store";
import routes from "./routes";

Vue.config.productionTip = false;

Vue.use(VueRouter);
const router = new VueRouter({ routes });
router.beforeEach((to, from, next) => {
  if (to.name != "login" && store.state.auth.username === undefined) {
    next("/login");
  } else {
    next();
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
import "./assets/css/style.sass";

Vue.use(Buefy);

import InfiniteLoading from "vue-infinite-loading";
Vue.use(InfiniteLoading, { system: { throttleLimit: 500 } });

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
