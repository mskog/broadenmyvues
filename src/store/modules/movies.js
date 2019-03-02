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
    posters: {},
    per_page: 10
  },

  getters: {
    getPoster: state => tmdb_id => {
      return state.posters[tmdb_id];
    },
    itemsByCategory: state => category => {
      return state.items.filter(movie => {
        return movie.category == category;
      });
    }
  },

  mutations: {
    refresh(state, { movies, category }) {
      Vue.set(state, "items", categorizedMovies(movies, category));
    },

    loadMore(state, { movies, category }) {
      Vue.set(
        state,
        "items",
        state.items.concat(categorizedMovies(movies, category))
      );
    },

    loadPoster(state, { tmdb_id, url }) {
      Vue.set(state.posters, tmdb_id, url);
    }
  },

  actions: {
    loadPoster(context, { tmdb_id }) {
      if (context.state.posters[tmdb_id]) {
        return;
      }
      Vue.http
        .get(`https://broad.mskog.com/api/v1/posters/${tmdb_id}`)
        .then(response => {
          context.commit("loadPoster", { tmdb_id, url: response.body.url });
        });
    },

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
    }
  }
};
