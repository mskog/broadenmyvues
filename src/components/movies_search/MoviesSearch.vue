<template>
  <div>
    <div v-for="result in results" v-bind:key="result.imdb_id">
      <Result v-bind="result" />
    </div>
  </div>
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

