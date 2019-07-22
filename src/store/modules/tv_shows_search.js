import Vue from "vue";

export default {
  namespaced: true,
  state: {
    query: "",
    results: [],
    details: []
  },
  getters: {
    getResult: state => imdb_id => {
      return state.results.find(result => {
        return result.imdb_id === imdb_id;
      });
    },
    getDetails: state => imdb_id => {
      return state.details.find(result => {
        return result.ids.imdb === imdb_id;
      });
    }
  },
  mutations: {
    refreshResults(state, { query, results }) {
      Vue.set(state, "query", query);
      Vue.set(state, "results", results);
    },
    refreshDetails(state, { imdb_id, data }) {
      const index = state.details.findIndex(item => item.ids.imdb == imdb_id);
      if (index == -1) {
        Vue.set(state, "details", state.details.concat(data));
      } else {
        Vue.set(state.details, index, data);
      }
    }
  },
  actions: {
    search(context, query) {
      return new Promise(resolve => {
        Vue.http.get(`tv_show_searches.json?query=${query}`).then(response => {
          context.commit("refreshResults", { query, results: response.body });
          resolve();
        });
      });
    },

    loadDetails(context, imdb_id) {
      return new Promise(resolve => {
        Vue.http.get(`tv_show_details/${imdb_id}.json`).then(response => {
          context.commit("refreshDetails", {
            imdb_id,
            data: response.body
          });
          resolve();
        });
      });
    },

    sample(context, imdb_id) {
      return new Promise(resolve => {
        Vue.http.patch(`tv_shows/${imdb_id}/sample.json`).then(() => {
          resolve();
        });
      });
    },

    collect(context, imdb_id) {
      return new Promise(resolve => {
        Vue.http.patch(`tv_shows/${imdb_id}/collect.json`).then(() => {
          resolve();
        });
      });
    }
  }
};
