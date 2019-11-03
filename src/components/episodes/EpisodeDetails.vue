<template>
  <div>
    <b-loading :active="loading" :is-full-page="true"></b-loading>
    <div v-if="!loading">
      <div class="episodedetails">
        <div class="top" :style="backgroundStyle">
          <div class="backbutton is-hidden-desktop" @click="goBack">
            <b-icon pack="fas" icon="arrow-left" size="is-medium"></b-icon>
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column is-6-desktop is-12-tablet">
            <div class="episodetitle">
              <router-link :to="`/tv_shows/details/${episode.tv_show_id}`">
                <h1 class="title is-size-2">
                  {{ episode.name }}
                </h1>
              </router-link>
              <h2 class="subtitle">
                {{ episode.tmdb_details.name }}
              </h2>
            </div>
            <div class="level is-mobile">
              <div class="level-item has-text-centered">
                <div>
                  <p class="title is-size-4">{{ episode | seasonEpisode }}</p>
                  <p class="heading is-size-6">Episode</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="title is-size-4">{{ episode.air_date }}</p>
                  <p class="heading is-size-6">Aired</p>
                </div>
              </div>
            </div>
            <div v-if="episode.tmdb_details.overview" class="synopsis">
              <p class="is-size-5">{{ episode.tmdb_details.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";
export default {
  props: ["id"],
  computed: {
    episode() {
      return this.$store.getters["episodes/getEpisode"](this.id);
    },
    loading() {
      return this.episode.name === undefined;
    },
    backgroundStyle() {
      return {
        "background-position": "top",
        "background-image": `linear-gradient(to top, #151A30, #151A30 0%, transparent), url(${this.$options.filters.thumb(
          this.episode.still,
          1080
        )})`
      };
    }
  },
  methods: {
    ...mapActions("episodes", ["refreshSingle"]),
    goBack() {
      this.$router.go(-1);
    }
  },

  watch: {
    id() {
      this.refreshSingle(this.id);
    }
  },
  created() {
    this.refreshSingle(this.id);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/style.scss";

.episodedetails > *:not(.top) {
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
  @include mobile {
    height: 66vh;
  }
  background-size: cover;
  background-position: center;
  padding-left: 2em;
  padding-right: 2em;

  .backbutton {
    position: fixed;
    top: 1rem;
    left: 1rem;

    a {
      color: $text;
      text-decoration: inherit;
    }
  }
}
.episodetitle {
  transform: translateY(-3rem);
}

.synopsis {
  padding-bottom: 50px;
}
</style>
