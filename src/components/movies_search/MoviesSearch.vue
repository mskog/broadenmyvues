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
            ></b-input>
            <p class="control">
              <button class="button is-primary" @click="search">
                Search
              </button>
            </p>
          </b-field>
        </div>
      </div>
      <div class="movies">
        <ul>
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
      query: "",
      loading: false
    };
  },
  methods: {
    // ...mapActions("movies_search", ["search"])

    search() {
      this.loading = true;
      this.$store
        .dispatch("movies_search/search", this.query)
        .then(response => {
          this.loading = false;
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

