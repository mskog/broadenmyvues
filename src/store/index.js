import Vue from "vue";
import Vuex from "vuex";

import VuexPersistence from "vuex-persist";

import movies from "./modules/movies";
import auth from "./modules/auth";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    movies,
    auth
  },
  plugins: [vuexLocal.plugin]
});
