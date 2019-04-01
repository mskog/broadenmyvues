import Vue from "vue";
import Vuex from "vuex";

import VuexPersistence from "vuex-persist";

import movies from "./modules/movies";
import tv_shows_calendar from "./modules/tv_shows_calendar";
import auth from "./modules/auth";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    movies,
    tv_shows_calendar,
    auth
  },
  plugins: [vuexLocal.plugin]
});
