import Vue from "vue";

export default {
  namespaced: true,
  state: {
    results: []
  },

  getters: {},

  mutations: {
    refreshResults(state, { results }) {
      Vue.set(state, "results", results);
    }
  },

  actions: {
    search(context, query) {
      Vue.http
        .get(
          `https://broad.mskog.com/api/v1/movie_searches.json?query=${query}`
        )
        .then(response => {
          context.commit("refreshResults", { results: response.body });
        });
    }
  }
};
