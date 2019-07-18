<template>
  <div>
    <b-loading :active="loading" :is-full-page="true"></b-loading>
    <div v-if="!loading">
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
          <div class="tv_show_title">
            <h1 class="title">
              {{ tv_show.name }}
            </h1>
          </div>
        </div>
        <div class="language">
          <b-icon pack="fas" icon="flag" size="is-small"></b-icon>
          {{ tv_show.tmdb_details.origin_country[0] }}
        </div>
        <hr />
        <div class="bottom">
          <div class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="title is-size-4">
                  {{ tv_show.tmdb_details.first_air_date }}
                </p>
                <p class="heading is-size-6">First aired</p>
              </div>
            </div>

            <div class="level-item has-text-centered">
              <div>
                <p class="title is-size-4">
                  {{ tv_show.trakt_details.status | capitalize }}
                </p>
                <p class="heading is-size-6">Status</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="synopsis">
          <h2 class="title is-size-4">Synopsis</h2>
          <p>{{ tv_show.tmdb_details.overview }}</p>
        </div>
        <Episodes :episodes="tv_show.released_episodes" />
      </div>
    </div>
  </div>
</template>

<script>
import Episodes from "./Episodes";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Episodes },
  props: ["id"],
  computed: {
    tv_show() {
      return this.$store.getters["tv_shows/getTvShow"](this.id);
    },
    loading() {
      return this.tv_show.name == undefined;
    },
    episodesLoading() {
      return true;
    },
    backgroundStyle() {
      return {
        "background-image": `linear-gradient(to top, #151A30, #151A30 0%, transparent), url(${this.$store.getters[
          "posters/getPoster"
        ]("tv_show", this.tv_show.tmdb_details.id)}`
      };
    },
    imdbUrl() {
      return `https://www.imdb.com/title/${this.tv_show.imdb_id}`;
    },
    ...mapGetters("tv_shows", ["getTvShow, getPoster"])
  },
  watch: {
    tv_show() {
      if (this.tv_show.id === undefined) {
        return;
      }
      this.loadPoster({
        tmdb_id: this.tv_show.tmdb_details.id,
        type: "tv_show"
      });
    }
  },
  methods: {
    ...mapActions("tv_show", ["refreshSingle"]),
    ...mapActions("posters", ["loadPoster"]),

    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.$store.dispatch("tv_shows/refreshSingle", this.id);
  }
};
</script>

<style lang="sass" scoped>
  @import '../../assets/css/style.sass'
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

    .tv_show_title
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

