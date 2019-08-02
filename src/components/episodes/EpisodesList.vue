<template>
  <div class="columns is-mobile is-multiline">
    <div
      class="column is-12-mobile is-4-desktop is-6-tablet"
      v-for="episode in episodes"
      v-bind:key="episode.id"
    >
      <Episode :episode="episode" />
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

<style lang="scss" scoped>
ul {
  padding-top: 5em;
}

li {
  margin-bottom: 4em;
}
</style>
