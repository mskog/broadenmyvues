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
      if (this.tv_show.tmdb_details === undefined) return false;
      return Object.keys(this.tv_show.tmdb_details).length > 0;
    }
  },
  methods: {
    refresh() {
      if (this.hasDetails) {
        clearInterval(this.timer);
        return;
      } else {
        console.log("dispatch");
        console.log(this.hasDetails);
        this.$store.dispatch("tv_shows/refreshSingle", this.id);
      }
    }
  },
  created() {
    this.$store.dispatch("tv_shows/refreshSingle", this.id);
    this.timer = setInterval(this.refresh, 1000);
  }
};
</script>
