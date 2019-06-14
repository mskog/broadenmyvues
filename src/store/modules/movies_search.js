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
    },

    reset(state) {
      Vue.set(state, "results", []);
    },

    loadReleaseinformation(state, { imdb_id, data }) {
      const index = state.results.findIndex(item => item.imdb_id == imdb_id);
      const movieWithDetails = Object.assign(state.results[index], data);
      Vue.set(state, index, movieWithDetails);
    }
  },

  actions: {
    search(context, query) {
      return new Promise(resolve => {
        Vue.http
          .get(
            `https://broad.mskog.com/api/v1/movie_searches.json?query=${query}`
          )
          .then(response => {
            context.commit("refreshResults", { results: response.body });
            resolve();
          });
      });
    },
    loadReleaseInformation(context, imdb_id) {
      return new Promise(resolve => {
        Vue.http
          .get(
            `https://broad.mskog.com/api/v1/movie_acceptable_releases/${imdb_id}.json`
          )
          .then(response => {
            context.commit("loadReleaseinformation", {
              imdb_id,
              data: response.body
            });
            resolve();
          });
      });
    },
    download(context, imdb_id) {
      return new Promise(resolve => {
        Vue.http
          .post(`https://broad.mskog.com/api/v1/movie_downloads/`, {
            query: imdb_id
          })
          .then(() => {
            resolve();
            context.dispatch("movies/refresh", "downloads", { root: true });
          });
      });
    },
    reset(context) {
      context.commit("reset");
    }
  }
};
