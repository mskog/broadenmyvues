<template>
  <div class="movies">
    <ul>
      <li v-for="tv_show in tv_shows" v-bind:key="tv_show.id">
        <TvShow :tv_show="tv_show"></TvShow>
      </li>
    </ul>
  </div>
</template>

<script>
import TvShow from "./TvShow.vue";

export default {
  props: ["tv_shows"],
  components: {
    TvShow
  }
};
</script>

<style lang="sass" scoped>
  ul
    padding-top: 5em

  li
    margin-bottom: 4em
</style>
