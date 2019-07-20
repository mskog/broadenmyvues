import Vue from "vue";
import Vuex from "vuex";

import VuexPersistence from "vuex-persist";

import posters from "./modules/posters";
import movies from "./modules/movies";
import movies_search from "./modules/movies_search";
import tv_shows_search from "./modules/tv_shows_search";
import episodes from "./modules/episodes";
import tv_shows from "./modules/tv_shows";
import tv_shows_calendar from "./modules/tv_shows_calendar";
import auth from "./modules/auth";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    posters,
    movies,
    movies_search,
    episodes,
    tv_shows,
    tv_shows_calendar,
    tv_shows_search,
    auth
  },
  plugins: [vuexLocal.plugin]
});
