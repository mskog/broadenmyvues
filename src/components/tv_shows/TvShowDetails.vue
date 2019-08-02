<template>
  <div>
    <div class="tv_show_details">
      <div class="top" :style="backgroundStyle">
        <div class="is-hidden-desktop">
          <div class="backbutton" @click="goBack">
            <b-icon pack="fas" icon="arrow-left" size="is-medium"></b-icon>
          </div>
          <div class="imdbLink">
            <a :href="imdbUrl">
              <b-icon pack="fab" icon="imdb" size="is-medium"></b-icon>
            </a>
          </div>
        </div>
        <div class="tv_show_title">
          <h1 class="title">
            {{ name }}
          </h1>
        </div>
      </div>
      <div class="language">
        <b-icon pack="fas" icon="flag" size="is-small"></b-icon>
        {{ tmdb_details.origin_country[0] }}
      </div>
      <hr />
      <div class="bottom">
        <div class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="title is-size-4">
                {{ tmdb_details.first_air_date }}
              </p>
              <p class="heading is-size-6">First aired</p>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div>
              <p class="title is-size-4">
                {{ trakt_details.status | capitalize }}
              </p>
              <p class="heading is-size-6">Status</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="synopsis">
        <h2 class="title is-size-4">Synopsis</h2>
        <p>{{ tmdb_details.overview }}</p>
      </div>
      <section class="action_buttons">
        <div class="row">
          <div class="columns">
            <div v-if="!watching" class="column">
              <b-button
                @click="isWatching(id)"
                class="button is-fullwidth is-primary"
                :loading="buttonWatchingLoading"
              >
                Watch
              </b-button>
            </div>
            <div v-if="watching" class="column">
              <b-button
                @click="notWatching(id)"
                class="button is-fullwidth is-danger"
                :loading="buttonNotWatchingLoading"
              >
                Unwatch
              </b-button>
            </div>
            <div v-if="!collected" class="column">
              <b-button
                @click="collect(id)"
                class="button is-fullwidth is-primary"
                :loading="buttonCollectLoading"
              >
                Collect
              </b-button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Episodes :episodes="released_episodes" />
      </section>
    </div>
  </div>
</template>

<script>
import Episodes from "./Episodes";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Episodes },

  props: [
    "id",
    "name",
    "tmdb_details",
    "trakt_details",
    "collected",
    "watching",
    "released_episodes"
  ],

  data() {
    return {
      buttonWatchingLoading: false,
      buttonNotWatchingLoading: false,
      buttonCollectLoading: false
    };
  },
  computed: {
    episodesLoading() {
      return true;
    },
    backgroundStyle() {
      return {
        "background-image": `linear-gradient(to top, #151A30, #151A30 0%, transparent), url(${this.$store.getters[
          "posters/getPoster"
        ]("tv_show", this.tmdb_details.id)}`
      };
    },
    imdbUrl() {
      return `https://www.imdb.com/title/${this.imdb_id}`;
    },
    ...mapGetters("tv_shows", ["getTvShow, getPoster"])
  },
  methods: {
    ...mapActions("tv_shows", ["refreshSingle"]),
    ...mapActions("posters", ["loadPoster"]),

    goBack() {
      this.$router.go(-1);
    },

    notWatching() {
      this.buttonNotWatchingLoading = true;
      this.$store.dispatch("tv_shows/notWatching", this.id).then(() => {
        this.buttonNotWatchingLoading = false;
      });
    },
    isWatching() {
      this.buttonWatchingLoading = true;
      this.$store.dispatch("tv_shows/watching", this.id).then(() => {
        this.buttonWatchingLoading = false;
      });
    },
    collect() {
      this.buttonCollectLoading = true;
      this.$store.dispatch("tv_shows/collect", this.id).then(() => {
        this.buttonCollectLoading = false;
      });
    }
  },

  created() {
    this.loadPoster({
      tmdb_id: this.tmdb_details.id,
      type: "tv_show"
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/style.scss";

section.action_buttons {
  margin-bottom: 2rem;
}

.tv_show_details > *:not(.top) {
  margin-left: 2rem;
  margin-right: 2rem;
}

hr {
  border-top: 2px solid $grey-darker;
}

.top {
  margin-top: -60px;
  position: relative;
  height: 66vh;
  background-size: cover;
  background-position: center;
  padding-left: 2rem;
  padding-right: 2rem;

  .tv_show_title {
    position: absolute;
    bottom: 25px;
  }
  .backbutton {
    position: fixed;
    top: 20px;
    left: 20px;
  }

  .imdbLink {
    position: fixed;
    top: 20px;
    right: 20px;

    a {
      color: $text;
      text-decoration: inherit;
    }
  }
}

.synopsis {
  padding-bottom: 50px;
}
</style>

