<template>
  <div class="movie columns is-mobile">
    <div class="column is-one-third">
      <lazy-component @show="loadPoster({ tmdb_id: movie.tmdb_id })">
        <img :src="getPoster(movie.tmdb_id)" class="poster">
      </lazy-component>
    </div>
    <div class="column">
      <h2 class="is-size-5 title">{{movie.title}}</h2>
      <p class="is-size-7">{{truncatedOverview}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["movie"],
  computed: {
    truncatedOverview() {
      if (this.movie.overview === null) {
        return "";
      }
      return this.movie.overview.substring(0, 90) + "...";
    },
    ...mapGetters("movies", ["getPoster"])
  },
  methods: {
    ...mapActions("movies", ["loadPoster"])
  }
};
</script>

<style lang="sass" scoped>
  div.movie
    background: #1E2748
    border-radius: 3px
    position: relative

  img.poster
    bottom: 1em
    height: 9em
    position: absolute
    border-radius: 3px
</style>

