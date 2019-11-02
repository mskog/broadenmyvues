<template>
  <div>
    <b-loading :active="loading" :is-full-page="true"></b-loading>
    <div class="moviedetails">
      <div class="top" :style="backgroundStyle">
        <div class="is-hidden-desktop backbutton" @click="goBack">
          <b-icon pack="fas" icon="arrow-left" size="is-medium"></b-icon>
        </div>
        <div class="is-hidden-desktop imdbLink">
          <a :href="imdbUrl">
            <b-icon pack="fab" icon="imdb" size="is-medium"></b-icon>
          </a>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-6-desktop is-12-tablet">
          <div class="movietitle">
            <h1 class="title is-size-1">
              {{ movie.title }}
            </h1>
          </div>
          <div class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="title is-size-4">{{ releaseYear }}</p>
                <p class="heading is-size-6">Released</p>
              </div>
            </div>

            <div class="level-item has-text-centered">
              <div>
                <p class="title is-size-4">
                  {{ movie.runtime }}
                </p>
                <p class="heading is-size-6">Runtime</p>
              </div>
            </div>
            <div v-if="!watched">
              <div class="level-item has-text-centered">
                <div>
                  <p class="title is-size-4">
                    {{ rtCriticsRatingFormatted }}
                  </p>
                  <p class="heading is-size-6">Tomatometer</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="title is-size-4">
                    {{ rtAudienceRatingFormatted }}
                  </p>
                  <p class="heading is-size-6">Audience</p>
                </div>
              </div>
            </div>
            <div v-else class="level-item has-text-centered">
              <div>
                <p class="title is-size-4">{{ movie.personal_rating }} / 10</p>
                <p class="heading is-size-6">Rating</p>
              </div>
            </div>
          </div>
          <div class="synopsis is-size-5">
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
          <div v-if="!downloaded" class="columns">
            <div v-if="movie.best_release" class="column is-2">
              <button @click="force" class="button is-fullwidth is-primary">
                Force
              </button>
            </div>
            <div class="column is-2-desktop is-12-mobile">
              <button @click="destroy" class="button is-fullwidth is-danger">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["id"],
  computed: {
    movie() {
      return this.$store.getters["movies/getMovie"](this.id);
    },
    loading() {
      return this.movie.name !== undefined;
    },
    backgroundStyle() {
      return {
        "background-image": `linear-gradient(to top, #151A30, #151A30 0%, transparent), url(${this.$store.getters[
          "posters/getPoster"
        ]("movie", this.movie.tmdb_id)}`
      };
    },
    rtCriticsRatingFormatted() {
      if (this.movie.rt_critics_rating == undefined) {
        return "?";
      } else {
        return this.movie.rt_critics_rating + "%";
      }
    },
    rtAudienceRatingFormatted() {
      if (this.movie.rt_audience_rating == undefined) {
        return "?";
      } else {
        return this.movie.rt_audience_rating + "%";
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
    imdbUrl() {
      return `https://www.imdb.com/title/${this.movie.imdb_id}`;
    },
    ...mapGetters("movies", ["getMovie, getPoster"])
  },
  watch: {
    movie() {
      this.loadPoster({ tmdb_id: this.movie.tmdb_id, type: "movie" });
    }
  },
  methods: {
    ...mapActions("movies", ["refreshSingle"]),
    ...mapActions("posters", ["loadPoster"]),

    force() {
      this.$store.dispatch("movies/force", this.movie.id);
      this.$router.push("/movies/waitlist");
    },
    destroy() {
      this.$store.dispatch("movies/destroy", this.movie.id);
      this.$router.push("/movies/waitlist");
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.$store.dispatch("movies/refreshSingle", this.id);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/style.scss";

.moviedetails > *:not(.top) {
  margin-left: 2em;
  margin-right: 2em;
}

hr {
  border-top: 2px solid $grey-darker;
}

.top {
  margin-top: -60px;
  position: relative;
  height: 66vh;
  background-size: cover;
  background-position: 25% 25%;
  padding-left: 2em;
  padding-right: 2em;

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

.movietitle {
  transform: translateY(-5rem);
}

.synopsis {
  padding-bottom: 50px;
}
</style>
