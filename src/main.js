import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import "./registerServiceWorker";

import store from "./store";
import routes from "./routes";

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

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");
const moment = require("moment");

Vue.filter("runtimeFormatted", runtime => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
});

Vue.filter("timeAgo", date => {
  return timeAgo.format(moment(date).toDate());
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
