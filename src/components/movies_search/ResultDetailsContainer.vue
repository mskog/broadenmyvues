<template>
  <div>
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
      return this.$store.getters["movies_search/getResult"](this.imdb_id);
    }
  }
};
</script>
