import Vue from "vue";

export default {
  namespaced: true,
  state: {
    movie: {},
    tv_show: {}
  },

  getters: {
    getPoster: state => (type, tmdb_id) => {
      return state[type][tmdb_id];
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
      Vue.http
        .get(`https://broad.mskog.com/api/v1/posters/${tmdb_id}?type=${type}`)
        .then(response => {
          context.commit("loadPoster", {
            type,
            tmdb_id,
            url: response.body.url
          });
        });
    }
  }
};
