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
      const item = state.items.find(item => item.id == id);
      if (item) {
        return item;
      } else {
        return {};
      }
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

    refreshSingle(state, { movie }) {
      const index = state.items.findIndex(item => item.id == movie.id);
      movie.category = state.items[index].category;
      if (index !== -1) {
        Vue.set(state.items, index, movie);
      }
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
        .get("movies.json", {
          params: { category, page: page + 1 }
        })
        .then(response => {
          context.commit("loadMore", { category, movies: response.body });
        });
    },

    refresh(context, category) {
      Vue.http
        .get("movies.json", {
          params: { category }
        })
        .then(response => {
          context.commit("refresh", { category, movies: response.body });
        });
    },
    refreshSingle(context, id) {
      Vue.http.get(`movies/${id}.json`).then(response => {
        context.commit("refreshSingle", { movie: response.body });
      });
    },
    force(context, id) {
      Vue.http.patch(`movie_waitlists/${id}/force`).then(() => {
        context.commit("setAsDownloaded", { id });
      });
    },
    destroy(context, id) {
      Vue.http.delete(`movie_waitlists/${id}`).then(() => {
        context.commit("destroy", { id });
      });
    }
  }
};
