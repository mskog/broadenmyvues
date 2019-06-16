<template>
  <section class="section">
    <b-loading :active="loading" :is-full-page="true"></b-loading>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-6-desktop">
          <b-field>
            <b-input
              placeholder="Movie title, imdb_id, imdb_url, etc..."
              expanded
              v-model="query"
              @keyup.native.enter="search"
              @focus="clear"
            ></b-input>
            <p class="control">
              <button class="button is-primary" @click="search">
                <b-icon pack="fas" icon="search" />
              </button>
            </p>
          </b-field>
        </div>
      </div>
      <div class="movies">
        <ul>
          <li v-if="!results.length && resultsLoaded">
            <h2 class="is-size-4">No results found</h2>
          </li>
          <li
            v-for="result in results"
            v-bind:key="`${result.title}-${result.imdb_id}`"
          >
            <Result v-bind="result" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Result from "./Result";

export default {
  components: {
    Result
  },
  data() {
    return {
      query: this.$store.state.movies_search.query,
      loading: false,
      resultsLoaded: false
    };
  },
  methods: {
    clear() {
      this.query = "";
    },

    search() {
      this.loading = true;
      this.resultsLoaded = false;
      this.$store
        .dispatch("movies_search/search", this.query)
        .then(response => {
          this.loading = false;
          this.resultsLoaded = true;
        });
    }
  },

  computed: {
    ...mapState("movies_search", ["results"])
  }
};
</script>

<style lang="sass" scoped>
  ul
    padding-top: 5em

  li
    margin-bottom: 4em
</style>

