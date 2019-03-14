<template>
  <div class="movies">
    <ul>
      <li v-for="movie in movies" v-bind:key="movie.id">
        <Movie :movie="movie" :category="category">{{ movies }}</Movie>
      </li>
    </ul>
  </div>
</template>

<script>
import Movie from "./Movie.vue";

export default {
  props: ["movies", "category"],
  components: {
    Movie
  }
};
</script>

<style lang="sass" scoped>
  ul
    padding-top: 5em

  li
    margin-bottom: 4em
</style>
