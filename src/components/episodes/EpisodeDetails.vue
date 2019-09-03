<template>
  <div>
    <b-loading :active="loading" :is-full-page="true"></b-loading>
    <div v-if="!loading">
      <div class="episodedetails">
        <div class="top" :style="backgroundStyle">
          <div class="backbutton is-hidden-desktop" @click="goBack">
            <b-icon pack="fas" icon="arrow-left" size="is-medium"></b-icon>
          </div>
          <div class="episodetitle">
            <router-link :to="`/tv_shows/details/${episode.tv_show_id}`">
              <h1 class="title">
                {{ episode.name }}
              </h1>
            </router-link>
            <h2 class="subtitle">
              {{ episode.tmdb_details.name }}
            </h2>
          </div>
        </div>
        <hr />
        <div class="bottom">
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
        </div>
        <hr />
        <div v-if="episode.tmdb_details.overview" class="synopsis">
          <h2 class="title is-size-4">Synopsis</h2>
          <p>{{ episode.tmdb_details.overview }}</p>
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
  height: 50vh;
  @include mobile {
    height: 33vh;
  }
  background-size: cover;
  background-position: center;
  padding-left: 2em;
  padding-right: 2em;

  .episodetitle {
    position: absolute;
    bottom: 25px;
  }
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

.synopsis {
  padding-bottom: 50px;
}
</style>
