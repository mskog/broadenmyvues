<template>
  <div class="episode">
    <router-link :to="`/episodes/details/${episode.id}`">
      <div :style="backgroundStyle"></div>
    </router-link>
    <b-icon
      v-if="episode.watched"
      class="watched"
      pack="fa"
      icon="eye"
      size="is-small"
    ></b-icon>
    <router-link :to="`/episodes/details/${episode.id}`">
      <div class="content">
        <h2
          class="is-marginless title is-size-4 has-text-white has-text-weight-bold"
          v-if="includeShowDetails"
        >
          {{ episode.name }}
        </h2>
        <p class="details is-size-5">
          <span class="has-text-weight-bold">{{
            episode | seasonEpisode
          }}</span>
          -
          {{ episode.tmdb_details.name }}
        </p>
        <p v-if="!includeShowDetails" class="is-size-6">
          {{ episode.tmdb_details.overview | truncate(100) }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "episode",
  props: ["episode", "includeShowDetails"],

  computed: {
    backgroundStyle() {
      return {
        "min-height": "150px",
        width: "auto",
        "background-size": "cover",
        "background-repeat": "none",
        "background-image": `linear-gradient(to bottom, rgba(21,26,48,0.5), rgba(21,26,48,0.8)), url(${this.stillImage})`
      };
    },

    stillImage() {
      return "https://thumbs.mskog.com/" + this.episode.still;
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: inherit;
  color: inherit;

  &:hover {
    text-decoration: inherit;
    color: inherit;
  }
}

.episode {
  position: relative;
  width: 100%;
}

.watched {
  position: absolute;
  top: 1em;
  right: 1em;
}

.content {
  position: absolute;
  bottom: 20px;
  left: 30px;

  .details {
    overflow: hidden;
    margin-bottom: 0;
  }

  .title  {
    padding-bottom: 5px;
  }
}
</style>


