<template>
  <div class="tv_show">
    <div class="columns is-mobile">
      <div class="column is-one-third">
        <router-link :to="`/search/tv_shows/details/${imdb_id}`">
          <lazy-component
            @show="loadPoster({ type: 'tv_show', tmdb_id: tmdb_id })"
          >
            <img :src="getPoster('tv_show', tmdb_id)" class="poster" />
          </lazy-component>
        </router-link>
      </div>
      <div class="column">
        <router-link :to="`/search/tv_shows/details/${imdb_id}`">
          <h2 class="title">{{ title }}</h2>
        </router-link>
        <div class="is-size-7">
          <div class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <b-icon pack="fa" icon="calendar" size="is-small"></b-icon>
                <span>{{ year }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResultDetails from "./ResultDetails";
import { mapGetters, mapActions } from "vuex";

export default {
  props: [
    "title",
    "year",
    "overview",
    "imdb_id",
    "tmdb_id",
    "tvdb_id",
    "imdb_url",
    "downloaded"
  ],

  components: {
    ResultDetails
  },

  computed: {
    ...mapGetters("posters", ["getPoster"])
  },
  methods: {
    ...mapActions("posters", ["loadPoster"])
  }
};
</script>

<style lang="sass" scoped>
  div.tv_show
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
