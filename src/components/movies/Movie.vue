<template>
  <div class="movie_content">
    <b-icon
      v-if="movie.download_at && category === 'waitlist'"
      class="download"
      pack="fa"
      icon="download"
      size="is-small"
    ></b-icon>
    <div class="column is-3-desktop is-4-mobile is-4-tablet">
      <lazy-component
        @show="loadPoster({ type: 'movie', tmdb_id: movie.tmdb_id })"
      >
        <router-link :to="`/movies/details/${movie.id}`">
          <img
            :src="getPoster('movie', movie.tmdb_id) | thumb(240)"
            class="poster"
          />
        </router-link>
      </lazy-component>
    </div>
    <div class="column title">
      <router-link :to="`/movies/details/${movie.id}`">
        <h2 class="is-size-5 title">{{ movie.title }}</h2>
      </router-link>
      <h2 class="subtitle ratings">
        <Ratings :rating="movie.rt_critics_rating" />
      </h2>
      <div class="is-size-7">
        <div class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <b-icon pack="fa" icon="calendar" size="is-small"></b-icon>
              <span>{{ new Date(this.movie.release_date).getFullYear() }}</span>
            </div>
            <div class="level-item">
              <b-icon pack="fa" icon="clock" size="is-small"></b-icon>
              <span>{{ movie.runtime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Ratings from "./Ratings.vue";

export default {
  props: ["movie", "category"],
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
    downloaded() {
      return Date.parse(this.movie.download_at) <= Date.now();
    },
    ...mapGetters("posters", ["getPoster"])
  },
  methods: {
    ...mapActions("posters", ["loadPoster"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/style.scss";

div.movie_content {
  background: $background-risen;
  border-radius: 5px;
  position: relative;
  height: 10rem;
  box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.75);
}

.download {
  position: absolute;
  left: 2rem;
  top: 2rem;
}

img.poster {
  bottom: 2rem;
  height: 100%;
  max-width: 30%;
  position: absolute;
  border-radius: 7px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.75);
}

.title {
  padding-top: 0.7rem;
}

h2 {
  letter-spacing: 1px;
}

h2.subtitle.ratings {
  font-size: 0.8rem;
  color: orange;
  margin-bottom: 0.5rem;
}
</style>

