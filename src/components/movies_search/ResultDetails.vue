<template>
  <div>
    <div class="moviedetails">
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
        </div>
      </div>
      <hr />
      <div class="bottom">
        <div class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="title is-size-4">{{ year }}</p>
              <p class="heading is-size-6">Released</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="synopsis">
        <h2 class="title is-size-4">Synopsis</h2>
        <p>{{ overview }}</p>
      </div>
      <div v-if="releasesLoaded">
        <Release
          v-bind:has_killer_release="has_killer_release"
          v-bind:has_acceptable_release="has_acceptable_release"
          v-bind:best_release="best_release"
          v-bind:imdb_id="imdb_id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Release from "./Release";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Release
  },
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
  data() {
    return {
      releasesLoaded: false
    };
  },
  computed: {
    backgroundStyle() {
      return {
        "background-image": `linear-gradient(to top, #151A30, #151A30 0%, transparent), url(${this.$store.getters[
          "posters/getPoster"
        ]("movie", this.tmdb_id)}`
      };
    },
    imdbUrl() {
      return `https://www.imdb.com/title/${this.imdb_id}`;
    },
    ...mapGetters("movies", ["getMovie, getPoster"])
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
    },

    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.checkReleases();
  }
};
</script>

<style lang="sass" scoped>
  @import '../../assets/css/style.sass'
  .moviedetails > *:not(.top)
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
</style>

