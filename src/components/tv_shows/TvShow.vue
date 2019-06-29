<template>
  <div class="movie columns is-mobile">
    <div class="column is-one-third">
      <lazy-component
        @show="
          loadPoster({ type: 'tv_show', tmdb_id: tv_show.tmdb_details.id })
        "
      >
        <!-- <router-link :to="`/movies/details/${movie.id}`"> -->
        <img
          :src="getPoster('tv_show', tv_show.tmdb_details.id)"
          class="poster image"
        />
        <!-- </router-link> -->
      </lazy-component>
    </div>
    <div class="column">
      <!-- <router-link :to="`/movies/details/${movie.id}`"> -->
      <h2 class="is-size-5 title">{{ tv_show.name }}</h2>
      <h2 class="subtitle ratings">
        <Ratings :rating="rating" />
      </h2>
      <!-- </router-link> -->
      <div class="is-size-7">
        <div class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <b-icon pack="fa" icon="calendar" size="is-small"></b-icon>
              <span>{{ tv_show.tmdb_details.first_air_date }}</span>
            </div>
            <div class="level-item">
              <b-icon pack="fa" icon="flag" size="is-small"></b-icon>
              <span>{{ tv_show.tmdb_details.origin_country[0] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ratings from "../movies/Ratings";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["tv_show"],
  components: { Ratings },
  computed: {
    ...mapGetters("posters", ["getPoster"]),

    truncatedSummary() {
      if (this.tv_show.summary === null) {
        return "";
      }
      return this.tv_show.summary.substring(0, 90) + "...";
    },

    rating() {
      return Math.round(this.tv_show.tmdb_details.vote_average * 10);
    }
  },
  methods: {
    ...mapActions("posters", ["loadPoster"])
  }
};
</script>

<style lang="sass" scoped>
  div.movie
    background: #1E2748
    border-radius: 3px
    position: relative
    padding: 7.5px
    height: 9em
    box-shadow: 4px 4px 7px rgba(0,0,0,0.75)

  img.poster
    bottom: 1.5em
    height: 9em
    position: absolute
    border-radius: 3px

  .download
    position: absolute
    right: 15px
    top: 15px

  h2
    letter-spacing: 1px

  h2.subtitle.ratings
    font-size: 12px
    color: orange
    margin-bottom: 15px
</style>

