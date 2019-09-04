<template>
  <div class="tv_show_content">
    <div class="column is-3-desktop is-4-table is-4-mobile">
      <router-link :to="`/search/tv_shows/details/${imdb_id}`">
        <lazy-component
          @show="loadPoster({ type: 'tv_show', tmdb_id: tmdb_id })"
        >
          <img :src="getPoster('tv_show', tmdb_id)" class="poster" />
        </lazy-component>
      </router-link>
    </div>
    <div class="column title">
      <router-link :to="`/search/tv_shows/details/${imdb_id}`">
        <h2 class="title is-size-5">{{ title }}</h2>
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

<style lang="scss" scoped>
div.tv_show_content {
  background: #1e2748;
  border-radius: 3px;
  position: relative;
  padding: 7.5px;
  min-height: 9em;
  box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.75);

  h2 {
    letter-spacing: 1px;
    margin-bottom: 0.5em;
  }

  div.overview {
    overflow: hidden;
    position: relative;
  }
}

img.poster {
  bottom: 2rem;
  height: 100%;
  max-width: 20%;
  position: absolute;
  border-radius: 7px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.75);
}
</style>
