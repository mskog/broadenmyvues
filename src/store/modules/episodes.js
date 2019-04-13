import Vue from "vue";

export default {
  namespaced: true,
  state: {
    items: [],
    per_page: 20
  },

  mutations: {
    refresh(state, { episodes }) {
      Vue.set(state, "items", episodes);
    },

    loadMore(state, { episodes }) {
      Vue.set(state, "items", state.items.concat(episodes));
    }
  },

  actions: {
    loadMore(context) {
      const page = context.state.items.length / context.state.per_page;

      return Vue.http
        .get("https://broad.mskog.com/api/v1/episodes.json", {
          params: { page: page + 1 }
        })
        .then(response => {
          context.commit("loadMore", { episodes: response.body });
        });
    },

    refresh(context) {
      Vue.http
        .get("https://broad.mskog.com/api/v1/episodes.json")
        .then(response => {
          context.commit("refresh", { episodes: response.body });
        });
    }
  }
};
