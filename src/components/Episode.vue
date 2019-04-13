<template>
  <div class="episode" :style="backgroundStyle">
    <div class="content">
      <h2 class="title is-size-5 has-text-white">{{ episode.name }}</h2>
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
        height: "200px",
        width: "auto",
        "background-size": "contain",
        "background-repeat": "none",
        "background-image": `linear-gradient(to top, #151A30, #151A30 10%, transparent), url(${
          this.episode.still
        })`
      };
    }
  }
};
</script>

<style lang="sass" scoped>
  .episode
    position: relative

    .content
      position: absolute
      bottom: 30px
      left: 30px
</style>


