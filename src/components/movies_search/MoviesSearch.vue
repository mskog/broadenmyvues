<template>
  <section class="section">
    <div class="container">
      <div class="movies">
        <ul>
          <li v-for="result in results" v-bind:key="result.imdb_id">
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
  methods: {
    ...mapActions("movies_search", ["search"])
  },

  computed: {
    ...mapState("movies_search", ["results"])
  },

  created() {
    this.search("finding nemo");
  }
};
</script>

<style lang="sass" scoped>
  ul
    padding-top: 5em

  li
    margin-bottom: 4em
</style>

