<template>
  <div class="columns is-mobile is-multiline">
    <div
      class="column is-12"
      v-for="episode in episodes"
      v-bind:key="episode.id"
    >
      <Episode :episode="episode">{{ episodes }}</Episode>
    </div>
  </div>
</template>

<script>
import Episode from "./Episode.vue";

export default {
  props: ["episodes"],
  components: {
    Episode
  }
};
</script>

<style lang="sass" scoped>
  ul
    padding-top: 5em

  li
    margin-bottom: 4em
</style>
