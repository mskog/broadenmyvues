import Vue from "vue";

export default {
  namespaced: true,
  state: {
    items: {}
  },

  getters: {
    getPoster: state => tmdb_id => {
      return state.items[tmdb_id];
    }
  },

  mutations: {
    loadPoster(state, { tmdb_id, url }) {
      Vue.set(state.items, tmdb_id, url);
    }
  },

  actions: {
    loadPoster(context, { tmdb_id }) {
      if (context.state.items[tmdb_id]) {
        return;
      }
      Vue.http
        .get(`https://broad.mskog.com/api/v1/posters/${tmdb_id}`)
        .then(response => {
          context.commit("loadPoster", { tmdb_id, url: response.body.url });
        });
    }
  }
};
