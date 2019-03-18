<template>
  <div class="moviedetails">
    <div class="top" :style="backgroundStyle">
      <div class="backbutton" @click="goBack">
        <b-icon pack="fas" icon="arrow-left" size="is-medium"></b-icon>
      </div>
      <div class="movietitle">
        <h1 class="title">
          {{ movie.title }}
        </h1>
      </div>
    </div>
    <div class="genres">
      {{ movie.genres }}
    </div>
    <div class="language">
      <b-icon pack="fas" icon="flag" size="is-small"></b-icon>
      {{ movie.language }}
    </div>
    <hr />
    <div class="bottom">
      <div class="level is-mobile">
        <div class="level-item has-text-centered">
          <div>
            <p class="title is-size-4">{{ releaseYear }}</p>
            <p class="heading is-size-6">Released</p>
          </div>
        </div>

        <div class="level-item khas-text-centered">
          <div>
            <p class="title is-size-4">
              {{ movie.runtime }}
            </p>
            <p class="heading is-size-6">Runtime</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div v-if="!watched">
            <p class="title is-size-4">{{ rtCriticsRatingFormatted }}</p>
            <p class="heading is-size-6">Rotten</p>
          </div>
          <div v-else>
            <p class="title is-size-4">{{ movie.personal_rating }} / 10</p>
            <p class="heading is-size-6">Rating</p>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="synopsis">
      <h2 class="title is-size-4">Synopsis</h2>
      <p>{{ movie.overview }}</p>
    </div>
    <div v-if="movie.best_release && !downloaded" class="synopsis">
      <h2 class="title is-size-4">Download</h2>
      <p class="has-text-weight-bold">
        {{ movie.best_release.joined_attributes }}
      </p>
      <span class="is-size-6"
        >Will download
        <span class="has-text-weight-bold">{{
          movie.download_at | timeAgo
        }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["id"],
  computed: {
    backgroundStyle() {
      return {
        "background-image": `linear-gradient(to top, #151A30, #151A30 0%, transparent), url(${this.$store.getters[
          "movies/getPoster"
        ](this.movie.tmdb_id)}`
      };
    },
    rtCriticsRatingFormatted() {
      if (this.movie.rt_critics_rating == undefined) {
        return "?";
      } else {
        return this.movie.rt_critics_rating + "%";
      }
    },
    releaseYear() {
      return new Date(this.movie.release_date).getFullYear();
    },
    downloaded() {
      return Date.parse(this.movie.download_at) <= Date.now();
    },
    watched() {
      return this.movie.watched_at !== "-";
    },
    ...mapGetters("movies", ["getMovie, getPoster"])
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  data() {
    return {
      movie: {}
    };
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  created() {
    this.movie = this.$store.getters["movies/getMovie"](this.id);
  }
};
</script>

<style lang="sass" scoped>
  @import '../assets/css/style.sass'

  hr
    border-top: 2px solid $grey-darker
    margin-left: 2em
    margin-right: 2em
  .top
    position: relative
    height: 66vh
    background-size: cover
    background-position: center
    padding-left: 2em
    padding-right: 2em

    .movietitle
      position: absolute
      bottom: 25px
    .backbutton
      position: fixed
      top: 20px
      left: 20px

  .genres
    margin-left: 2em
    margin-right: 2em

  .language
    margin-left: 2em
    margin-right: 2em

  .bottom
    padding-left: 2em
    padding-right: 2em

  .synopsis
    padding-left: 2em
    padding-right: 2em
    padding-bottom: 50px
</style>

