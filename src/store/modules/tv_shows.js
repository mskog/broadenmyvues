import Vue from "vue";

export default {
  namespaced: true,
  state: {
    items: []
  },

  getters: {
    getTvShow: state => id => {
      const item = state.items.find(item => item.id == id);
      if (item) {
        return item;
      } else {
        return {};
      }
    }
  },

  mutations: {
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
    refresh(context) {
      Vue.http
        .get("https://broad.mskog.com/api/v1/tv_shows.json")
        .then(response => {
          context.commit("refresh", { tv_shows: response.body });
        });
    },

    refreshSingle(context, id) {
      Vue.http
        .get(`https://broad.mskog.com/api/v1/tv_shows/${id}.json`)
        .then(response => {
          context.commit("refreshSingle", { episode: response.body });
        });
    }
  }
};
