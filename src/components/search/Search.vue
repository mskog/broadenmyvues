<template>
  <section class="section">
    <b-loading :active="loading" :is-full-page="true"></b-loading>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-6-desktop">
          <b-field>
            <b-input
              size="is-medium"
              placeholder="Title, imdb_id, imdb_url, etc..."
              expanded
              v-model="query"
              @keyup.native.enter="search"
              @focus="clear"
            ></b-input>
            <p class="control">
              <button class="button is-primary is-medium" @click="search">
                <b-icon pack="fas" icon="search" />
              </button>
            </p>
          </b-field>
        </div>
      </div>
      <b-tabs v-if="resultsLoaded" expanded @change="lazyLoad">
        <b-tab-item v-if="resultsLoaded" label="Movies">
          <div class="movies">
            <MovieResults :results="movieResults" />
          </div>
        </b-tab-item>
        <b-tab-item v-if="resultsLoaded" label="TV Shows">
          <div class="tv_shows">
            <TvShowResults :results="tvShowResults" />
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MovieResults from "./movies/Results";
import TvShowResults from "./tv_shows/Results";

export default {
  components: {
    MovieResults,
    TvShowResults
  },

  props: ["q"],

  data() {
    return {
      query: "",
      loading: false,
      resultsLoaded: false
    };
  },
  methods: {
    clear() {
      this.query = "";
    },

    // ewwwww. But it works
    lazyLoad() {
      setTimeout(() => this.$Lazyload.lazyLoadHandler(), 0);
    },

    search() {
      this.loading = true;
      this.resultsLoaded = false;

      const moviesSearch = this.$store.dispatch(
        "movies_search/search",
        this.query
      );

      const tvShowsSearch = this.$store.dispatch(
        "tv_shows_search/search",
        this.query
      );

      Promise.all([moviesSearch, tvShowsSearch]).then(() => {
        this.loading = false;
        this.resultsLoaded = true;
      });
    }
  },

  created() {
    if (this.q) {
      this.query = this.q;
      this.search();
    }
  },

  computed: {
    movieResults() {
      return this.$store.state.movies_search.results;
    },
    tvShowResults() {
      return this.$store.state.tv_shows_search.results;
    }
  }
};
</script>
