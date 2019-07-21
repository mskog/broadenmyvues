<template>
  <div>
    <b-loading :active="!hasDetails" :is-full-page="true"></b-loading>
    <TvShowDetails v-if="hasDetails" v-bind="tv_show" />
  </div>
</template>

<script>
import TvShowDetails from "./TvShowDetails";

export default {
  props: ["id"],
  components: {
    TvShowDetails
  },
  computed: {
    tv_show() {
      return this.$store.getters["tv_shows/getTvShow"](this.id);
    },

    hasDetails() {
      return this.tv_show.tmdb_details !== undefined;
    }
  },
  watch: {
    tv_show() {
      if (!this.hasDetails) {
        setTimeout(() => {
          this.$store.dispatch("tv_shows/refreshSingle", this.id);
        }, 2000);
      }
    }
  },
  created() {
    this.$store.dispatch("tv_shows/refreshSingle", this.id);
  }
};
</script>
