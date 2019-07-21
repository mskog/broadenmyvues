<template>
  <div>
    <div class="tv_show_details">
      <div class="top" :style="backgroundStyle">
        <div class="backbutton" @click="goBack">
          <b-icon pack="fas" icon="arrow-left" size="is-medium"></b-icon>
        </div>
        <div class="imdbLink">
          <a :href="imdbUrl">
            <b-icon pack="fab" icon="imdb" size="is-medium"></b-icon>
          </a>
        </div>
        <div class="movietitle">
          <h1 class="title">
            {{ title }}
          </h1>
          <h2 class="subtitle ratings">
            <Ratings :rating="ratingFormatted" />
          </h2>
        </div>
      </div>
      <hr />
      <div class="bottom">
        <div class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="title is-size-4">{{ year }}</p>
              <p class="heading is-size-6">First aired</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="title is-size-4">{{ status | capitalize }}</p>
              <p class="heading is-size-6">Status</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="synopsis">
        <h2 class="title is-size-4">Synopsis</h2>
        <p>{{ overview }}</p>
      </div>
      <div class="column">
        <b-button
          @click="sample"
          class="button is-fullwidth is-success"
          :loading="buttonSampleLoading"
        >
          Sample
        </b-button>
      </div>
      <div class="column">
        <b-button
          @click="collect"
          class="button is-fullwidth is-primary"
          :loading="buttonCollectLoading"
        >
          Collect
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Ratings from "../../movies/Ratings";
import { mapGetters, mapActions } from "vuex";

export default {
  props: [
    "ids",
    "title",
    "year",
    "overview",
    "first_aired",
    "trailer",
    "homepage",
    "rating",
    "runtime",
    "votes",
    "updated_at",
    "language",
    "genres",
    "certification",
    "country",
    "network",
    "status",
    "aired_episodes"
  ],

  components: { Ratings },

  data() {
    return {
      buttonSampleLoading: false,
      buttonCollectLoading: false
    };
  },

  computed: {
    backgroundStyle() {
      return {
        "background-image": `linear-gradient(to top, #151A30, #151A30 0%, transparent), url(${this.$store.getters[
          "posters/getPoster"
        ]("tv_show", this.ids.tmdb)}`
      };
    },
    imdbUrl() {
      return `https://www.imdb.com/title/${this.ids.imdb}`;
    },
    ratingFormatted() {
      return Math.round(this.rating * 10);
    }
  },
  methods: {
    ...mapActions("posters", ["loadPoster"]),

    goBack() {
      this.$router.go(-1);
    },

    sample() {
      this.buttonSampleLoading = true;
      this.$store.dispatch("tv_shows_search/sample", this.ids.imdb).then(() => {
        this.buttonSampleLoading = false;
        this.$snackbar.open(`TV Show ${this.title} sampled.`);
        this.$router.push("/tv_shows/details/" + this.ids.imdb);
      });
    },
    collect() {
      this.buttonCollectLoading = true;
      this.$store
        .dispatch("tv_shows_search/collect", this.ids.imdb)
        .then(() => {
          this.buttonCollectLoading = false;
        });
    }
  }
};
</script>

<style lang="sass" scoped>
  @import '../../../assets/css/style.sass'
  .tv_show_details > *:not(.top)
    margin-left: 2em
    margin-right: 2em

  hr
    border-top: 2px solid $grey-darker
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

    .imdbLink
      position: fixed
      top: 20px
      right: 20px

      a
        color: $text
        text-decoration: inherit

  .synopsis
    padding-bottom: 50px

  h2.subtitle.ratings
    font-size: 12px
    color: orange
</style>

