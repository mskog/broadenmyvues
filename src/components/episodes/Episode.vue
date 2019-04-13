<template>
  <div class="episode">
    <div :style="backgroundStyle"></div>
    <b-icon
      v-if="episode.watched"
      class="watched"
      pack="fa"
      icon="eye"
      size="is-small"
    ></b-icon>
    <div class="content">
      <h2
        class="is-marginless title is-size-4 has-text-white has-text-weight-bold"
      >
        {{ episode.name }}
      </h2>
      <p class="details is-size-5">
        <span class="has-text-weight-bold">{{ episode | seasonEpisode }}</span>
        -
        {{ episode.tmdb_details.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "episode",
  props: ["episode"],

  computed: {
    backgroundStyle() {
      return {
        "min-height": "200px",
        width: "auto",
        "background-size": "cover",
        "background-repeat": "none",
        "background-image": `linear-gradient(rgba(21,26,48,0.4), rgba(21,26,48,0.8)), url(${
          this.stillImage
        })`
      };
    },

    stillImage() {
      return "https://thumbs.mskog.com/" + this.episode.still;
    }
  }
};
</script>

<style lang="sass" scoped>
  .episode
    position: relative
    width: 100%

  .watched
    position: absolute
    top: 20px
    right: 20px

  .content
    position: absolute
    bottom: 20px
    left: 30px

    .details
      overflow: hidden

    .title
      padding-bottom: 5px
</style>


