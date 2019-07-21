import Vue from "vue";

export default {
  namespaced: true,
  state: {
    items: []
  },

  getters: {
    getTvShow: state => id => {
      const item = state.items.find(item => {
        return item.id == id || item.imdb_id == id;
      });
      if (item) {
        return item;
      } else {
        return {};
      }
    }
  },

  mutations: {
    loadMore(state, { tv_shows }) {
      Vue.set(state, "items", state.items.concat(tv_shows));
    },

    refresh(state, { tv_shows }) {
      Vue.set(state, "items", tv_shows);
    },

    refreshSingle(state, { tv_show }) {
      const index = state.items.findIndex(item => item.id == tv_show.id);
      if (index == -1) {
        Vue.set(state, "items", state.items.concat(tv_show));
      } else {
        Vue.set(state.items, index, tv_show);
      }
    }
  },

  actions: {
    loadMore(context) {
      const page = context.state.items.length / 10;

      return Vue.http
        .get("https://broad.mskog.com/api/v1/tv_shows.json", {
          params: { page: page + 1, per_page: 10 }
        })
        .then(response => {
          context.commit("loadMore", { tv_shows: response.body });
        });
    },

    refresh(context) {
      Vue.http
        .get("https://broad.mskog.com/api/v1/tv_shows.json", {
          params: { per_page: 10 }
        })
        .then(response => {
          context.commit("refresh", { tv_shows: response.body });
        });
    },

    refreshSingle(context, id) {
      Vue.http
        .get(`https://broad.mskog.com/api/v1/tv_shows/${id}.json`)
        .then(response => {
          context.commit("refreshSingle", { tv_show: response.body });
        });
    },

    collect(context, id) {
      return Vue.http
        .patch(`https://broad.mskog.com/api/v1/tv_shows/${id}/collect.json`)
        .then(response => {
          context.commit("refreshSingle", { tv_show: response.body });
        });
    },

    watching(context, id) {
      return Vue.http
        .patch(`https://broad.mskog.com/api/v1/tv_shows/${id}/watching.json`)
        .then(response => {
          context.commit("refreshSingle", { tv_show: response.body });
        });
    },

    notWatching(context, id) {
      return Vue.http
        .patch(
          `https://broad.mskog.com/api/v1/tv_shows/${id}/not_watching.json`
        )
        .then(response => {
          context.commit("refreshSingle", { tv_show: response.body });
        });
    }
  }
};
