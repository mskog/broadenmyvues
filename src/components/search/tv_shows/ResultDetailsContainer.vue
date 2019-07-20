<template>
  <div>
    <b-loading :active="result === undefined" :is-full-page="true"></b-loading>
    <ResultDetails v-if="result !== undefined" v-bind="result" />
  </div>
</template>

<script>
import ResultDetails from "./ResultDetails";

export default {
  props: ["imdb_id"],
  components: {
    ResultDetails
  },
  computed: {
    result() {
      return this.$store.getters["tv_shows_search/getDetails"](this.imdb_id);
    }
  },
  created() {
    this.$store.dispatch("tv_shows_search/loadDetails", this.imdb_id);
  }
};
</script>
