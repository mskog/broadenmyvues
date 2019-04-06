import Vue from "vue";

export default {
  namespaced: true,
  state: {
    data: {}
  },

  getters: {
    hasData: state => {
      return Object.keys(state.data).length === 0;
    }
  },

  mutations: {
    refresh(state, { data }) {
      Vue.set(state, "data", data);
    }
  },

  actions: {
    refresh(context) {
      Vue.http
        .get("https://broad.mskog.com/api/v1/tv_shows_calendar.json")
        .then(response => {
          context.commit("refresh", { data: response.body });
        });
    }
  }
};
