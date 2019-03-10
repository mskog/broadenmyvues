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
    <hr />
    <div class="bottom">
      <div class="level is-mobile">
        <div class="level-item has-text-centered">
          <div>
            <p class="title is-size-4">{{ releaseYear }}</p>
            <p class="heading is-size-6">Released</p>
          </div>
        </div>

        <div class="level-item has-text-centered">
          <div>
            <p class="title is-size-4">{{ runtimeFormatted }}</p>
            <p class="heading is-size-6">Runtime</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title is-size-4">{{ rtCriticsRatingFormatted }}</p>
            <p class="heading is-size-6">Rotten</p>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="details">
      <h2 class="title is-size-4">Synopsis</h2>
      <p>{{ movie.overview }}</p>
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
    runtimeFormatted() {
      const runtime = parseInt(this.movie.runtime);
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return `${hours}h ${minutes}m`;
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

  .bottom
    padding-left: 2em
    padding-right: 2em

  .details
    padding-left: 2em
    padding-right: 2em
</style>

