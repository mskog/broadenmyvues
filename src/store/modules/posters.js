import Vue from "vue";

export default {
  namespaced: true,
  state: {
    movie: {},
    tv_show: {}
  },

  getters: {
    getPoster: state => (type, tmdb_id) => {
      const poster = state[type][tmdb_id];
      if (poster) {
        return poster;
      } else {
        return "";
      }
    }
  },

  mutations: {
    loadPoster(state, { type, tmdb_id, url }) {
      Vue.set(state[type], tmdb_id, url);
    }
  },

  actions: {
    loadPoster(context, { tmdb_id, type }) {
      if (context.state[type][tmdb_id]) {
        return;
      }
      Vue.http.get(`posters/${tmdb_id}?type=${type}`).then(response => {
        context.commit("loadPoster", {
          type,
          tmdb_id,
          url: response.body.url
        });
      });
    }
  }
};
