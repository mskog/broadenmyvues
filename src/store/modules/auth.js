import Vue from "vue";

export default {
  namespaced: true,
  state: {
    username: undefined,
    password: undefined
  },

  mutations: {
    setCredentials(state, { username, password }) {
      Vue.set(state, "username", username);
      Vue.set(state, "password", password);
    }
  },

  actions: {
    setCredentials(context, { username, password }) {
      context.commit("setCredentials", { username, password });
    }
  }
};
