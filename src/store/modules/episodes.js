import Vue from "vue";

export default {
  namespaced: true,
  state: {
    items: [],
    per_page: 20
  },

  getters: {
    getEpisode: state => id => {
      const item = state.items.find(item => item.id == id);
      if (item) {
        return item;
      } else {
        return {};
      }
    }
  },

  mutations: {
    refresh(state, { episodes }) {
      Vue.set(state, "items", episodes);
    },

    loadMore(state, { episodes }) {
      Vue.set(state, "items", state.items.concat(episodes));
    },

    refreshSingle(state, { episode }) {
      const index = state.items.findIndex(item => item.id == episode.id);
      if (index == -1) {
        Vue.set(state, "items", state.items.concat(episode));
      } else {
        Vue.set(state.items, index, episode);
      }
    }
  },

  actions: {
    loadMore(context) {
      const page = context.state.items.length / context.state.per_page;

      return Vue.http
        .get("episodes.json", {
          params: { page: page + 1 }
        })
        .then(response => {
          context.commit("loadMore", { episodes: response.body });
        });
    },

    refresh(context) {
      Vue.http.get("episodes.json").then(response => {
        context.commit("refresh", { episodes: response.body });
      });
    },

    refreshSingle(context, id) {
      Vue.http.get(`episodes/${id}.json`).then(response => {
        context.commit("refreshSingle", { episode: response.body });
      });
    }
  }
};
