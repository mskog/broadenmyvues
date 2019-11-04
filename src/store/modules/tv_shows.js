import Vue from "vue";

export default {
  namespaced: true,
  state: {
    category: "watching",
    complete: false,
    per_page: 20,
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
      console.log(state.complete);
      if (tv_shows.length === 0) {
        Vue.set(state, "complete", true);
      } else {
        Vue.set(state, "items", state.items.concat(tv_shows));
      }
    },

    refresh(state, { tv_shows, category }) {
      Vue.set(state, "items", tv_shows);
      Vue.set(state, "complete", false);
      Vue.set(state, "category", category);
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
    loadMore(context, category) {
      const page = Math.ceil(context.state.items.length / context.state.per_page);

      return Vue.http
        .get("tv_shows.json", {
          params: { page: page + 1, per_page: context.state.per_page, category }
        })
        .then(response => {
          context.commit("loadMore", { tv_shows: response.body });
        });
    },

    refresh(context, category) {
      Vue.http
        .get("tv_shows.json", {
          params: { per_page: 20, category: category }
        })
        .then(response => {
          context.commit("refresh", { tv_shows: response.body, category });
        });
    },

    refreshSingle(context, id) {
      Vue.http.get(`tv_shows/${id}.json`).then(response => {
        context.commit("refreshSingle", { tv_show: response.body });
      });
    },

    collect(context, id) {
      return Vue.http.patch(`tv_shows/${id}/collect.json`).then(response => {
        context.commit("refreshSingle", { tv_show: response.body });
      });
    },

    watching(context, id) {
      return Vue.http.patch(`tv_shows/${id}/watching.json`).then(response => {
        context.commit("refreshSingle", { tv_show: response.body });
      });
    },

    notWatching(context, id) {
      return Vue.http.patch(`tv_shows/${id}/not_watching.json`).then(response => {
        context.commit("refreshSingle", { tv_show: response.body });
      });
    }
  }
};
