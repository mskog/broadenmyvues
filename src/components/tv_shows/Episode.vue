<template>
  <div class="episode columns is-mobile is-variable is-1">
    <div class="column is-one-third">
      <lazy-component>
        <figure class="image is-16by9">
          <router-link :to="`/episodes/details/${episode.id}`">
            <img :src="still" />
          </router-link>
        </figure>
      </lazy-component>
    </div>
    <div class="column">
      <router-link :to="`/episodes/details/${episode.id}`">
        <h2 class="is-size-6-mobile title">
          {{ episode.episode }}. {{ episode.tmdb_details.name | truncate(30) }}
        </h2>
      </router-link>
      <div class="overview is-size-7-mobile">{{ overview | truncate(75) }}</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: ["episode"],

  computed: {
    overview() {
      if (
        this.episode.tmdb_details === undefined ||
        this.episode.tmdb_details.overview === undefined
      ) {
        return "";
      }
      return this.episode.tmdb_details.overview;
    },
    still() {
      return Vue.filter("thumb")(this.episode.still, 1080);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/style.scss";

div.episode  {
  border-radius: 3px;
  h2.title {
    margin-bottom: 0;
  }
}

img.poster {
  border-radius: 3px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.75);
}

h2 {
  letter-spacing: 1px;
}
</style>

