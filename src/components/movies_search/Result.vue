<template>
  <div class="movie columns is-mobile">
    <div class="column is-one-third">
      <lazy-component @show="loadPoster({ type: 'movie', tmdb_id: tmdb_id })">
        <img :src="getPoster('movie', tmdb_id)" class="poster" />
      </lazy-component>
    </div>
    <div class="column">
      <h2 class="is-size-5 title">{{ title }}</h2>
      <div class="is-size-7">
        <div class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <b-icon pack="fa" icon="calendar" size="is-small"></b-icon>
              <span>{{ year }}</span>
            </div>
          </div>
        </div>
        <p>{{ truncatedOverview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: [
    "title",
    "imdb_id",
    "imdb_url",
    "overview",
    "year",
    "tmdb_id",
    "downloaded"
  ],

  computed: {
    ...mapGetters("posters", ["getPoster"]),
    truncatedOverview() {
      if (this.overview === null) {
        return "";
      }
      return this.overview.substring(0, 90) + "...";
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
    min-height: 9em
    box-shadow: 4px 4px 7px rgba(0,0,0,0.75)

    h2
      letter-spacing: 1px
      margin-bottom: 0.5em

    div.overview
      overflow: hidden
      position: relative

  img.poster
    top: -1.5em
    height: 9em
    width: 6em
    position: absolute
    border-radius: 3px

</style>
