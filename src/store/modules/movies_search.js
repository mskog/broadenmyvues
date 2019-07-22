import Vue from "vue";

export default {
  namespaced: true,
  state: {
    query: "",
    results: []
  },

  getters: {
    getResult: state => imdb_id => {
      return state.results.find(result => {
        return result.imdb_id === imdb_id;
      });
    }
  },

  mutations: {
    refreshResults(state, { query, results }) {
      Vue.set(state, "query", query);
      Vue.set(state, "results", results);
    },

    reset(state) {
      Vue.set(state, "results", []);
    },

    loadReleaseinformation(state, { imdb_id, data }) {
      const index = state.results.findIndex(item => item.imdb_id == imdb_id);
      Vue.set(state.results, index, { ...state.results[index], ...data });
    }
  },

  actions: {
    search(context, query) {
      return new Promise(resolve => {
        Vue.http.get(`movie_searches.json?query=${query}`).then(response => {
          context.commit("refreshResults", { query, results: response.body });
          resolve();
        });
      });
    },
    loadReleaseInformation(context, imdb_id) {
      return new Promise(resolve => {
        Vue.http
          .get(`movie_acceptable_releases/${imdb_id}.json`)
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
          .post(`movie_downloads/`, {
            query: imdb_id
          })
          .then(() => {
            setTimeout(() => {
              context.dispatch("movies/refresh", "downloads", { root: true });
              resolve();
            }, 1000);
          });
      });
    },
    waitlist(context, imdb_id) {
      return new Promise(resolve => {
        Vue.http
          .post(`movie_waitlists/`, {
            imdb_id: imdb_id
          })
          .then(() => {
            setTimeout(() => {
              context.dispatch("movies/refresh", "waitlist", { root: true });
              resolve();
            }, 1000);
          });
      });
    },
    reset(context) {
      context.commit("reset");
    }
  }
};
