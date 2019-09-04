<template>
  <div class="movie_content">
    <div class="column is-3-desktop is-4-mobile is-4-tablet">
      <router-link :to="`/search/movies/details/${imdb_id}`">
        <lazy-component @show="loadPoster({ type: 'movie', tmdb_id: tmdb_id })">
          <img :src="getPoster('movie', tmdb_id) | thumb(240)" class="poster" />
        </lazy-component>
      </router-link>
    </div>
    <div class="column title">
      <router-link :to="`/search/movies/details/${imdb_id}`">
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
import Release from "./Release";
import { mapGetters, mapActions } from "vuex";

export default {
  props: [
    "title",
    "imdb_id",
    "imdb_url",
    "overview",
    "year",
    "tmdb_id",
    "downloaded",
    "has_killer_release",
    "has_acceptable_release",
    "best_release"
  ],

  components: {
    Release
  },

  data() {
    return {
      releasesLoaded: false
    };
  },

  computed: {
    ...mapGetters("posters", ["getPoster"])
  },
  methods: {
    ...mapActions("posters", ["loadPoster"]),

    checkReleases() {
      this.releasesLoaded = false;
      this.$store
        .dispatch("movies_search/loadReleaseInformation", this.imdb_id)
        .then(() => {
          this.releasesLoaded = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
div.movie_content {
  background: #1e2748;
  border-radius: 3px;
  position: relative;
  padding: 7.5px;
  min-height: 9em;
  box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.75);

  .title {
    padding-top: 0.7rem;
  }

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
  max-width: 30%;
  position: absolute;
  border-radius: 7px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.75);
}
</style>
