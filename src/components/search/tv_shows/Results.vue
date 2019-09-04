<template>
  <div class="tv_shows">
    <div class="columns is-multiline">
      <div
        v-for="result in results"
        v-bind:key="`${result.title}-${result.imdb_id}`"
        class="tv_show column is-half"
      >
        <Result v-bind="result" class="columns is-mobile" />
      </div>
    </div>
  </div>
</template>

<script>
import Result from "./Result";

export default {
  props: ["results"],
  components: { Result }
};
</script>

<style lang="scss" scoped>
.tv_shows  {
  margin-top: 3rem;
}

.tv_show {
  padding-top: 4rem;
  padding-right: 2rem;
}
</style>
