<template>
  <div class="movies">
    <div class="columns is-multiline">
      <div
        v-for="movie in movies"
        v-bind:key="movie.id"
        class="movie column is-half"
      >
        <Movie
          :movie="movie"
          :category="category"
          class="columns is-mobile"
        ></Movie>
      </div>
    </div>
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

<style lang="scss" scoped>
.movies  {
  margin-top: 3rem;
}

.movie {
  padding-top: 4rem;
  padding-right: 2rem;
}
</style>
