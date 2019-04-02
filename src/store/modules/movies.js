import Vue from "vue";

function categorizedMovies(movies, category) {
  return movies.map(movie => {
    movie.category = category;
    return movie;
  });
}

export default {
  namespaced: true,
  state: {
    items: [],
    per_page: 10
  },

  getters: {
    getMovie: state => id => {
      return state.items.find(item => item.id == id);
    },
    itemsByCategory: state => category => {
      return state.items.filter(movie => {
        return movie.category == category;
      });
    }
  },

  mutations: {
    refresh(state, { movies, category }) {
      const itemsWithoutSelectedCategory = state.items.filter(
        item => item.category !== category
      );
      const newItems = categorizedMovies(movies, category);
      Vue.set(state, "items", itemsWithoutSelectedCategory.concat(newItems));
    },

    loadMore(state, { movies, category }) {
      Vue.set(
        state,
        "items",
        state.items.concat(categorizedMovies(movies, category))
      );
    },

    setAsDownloaded(state, { id }) {
      const index = state.items.findIndex(item => item.id == id);
      Vue.set(state.items[index], "category", "downloads");
    },

    destroy(state, { id }) {
      const index = state.items.findIndex(item => item.id == id);
      Vue.delete(state.items, index);
    }
  },

  actions: {
    loadMore(context, category) {
      const page =
        context.getters.itemsByCategory(category).length /
        context.state.per_page;

      return Vue.http
        .get("https://broad.mskog.com/api/v1/movies.json", {
          params: { category, page: page + 1 }
        })
        .then(response => {
          context.commit("loadMore", { category, movies: response.body });
        });
    },

    refresh(context, category) {
      Vue.http
        .get("https://broad.mskog.com/api/v1/movies.json", {
          params: { category }
        })
        .then(response => {
          context.commit("refresh", { category, movies: response.body });
        });
    },
    force(context, id) {
      context.commit("setAsDownloaded", { id });
      Vue.http.patch(
        `https://broad.mskog.com/api/v1/movie_waitlists/${id}/force`
      );
    },
    destroy(context, id) {
      context.commit("destroy", { id });
      Vue.http.delete(`https://broad.mskog.com/api/v1/movie_waitlists/${id}`);
    }
  }
};
