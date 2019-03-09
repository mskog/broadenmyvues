<template>
  <div class="movie columns is-mobile">
    <div class="column is-one-third">
      <lazy-component @show="loadPoster({ tmdb_id: movie.tmdb_id })">
        <img :src="getPoster(movie.tmdb_id)" class="poster" />
      </lazy-component>
    </div>
    <div class="column">
      <h2 class="is-size-5 title">{{ movie.title }}</h2>
      <h2 class="subtitle ratings">
        <Ratings :rating="movie.rt_critics_rating" />
      </h2>
      <div class="is-size-7">
        <b-icon pack="fa" icon="clock" size="is-small"></b-icon>
        <span>{{ movie.runtime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Ratings from "./Ratings.vue";

export default {
  props: ["movie"],
  components: {
    Ratings
  },
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
    padding: 7.5px
    height: 8em

  img.poster
    bottom: 1em
    height: 9em
    position: absolute
    border-radius: 3px

  h2
    letter-spacing: 1px

  h2.subtitle.ratings
    font-size: 12px
    color: orange
    margin-bottom: 15px
</style>

