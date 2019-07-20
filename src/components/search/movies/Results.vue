<template>
  <ul>
    <li
      v-for="result in results"
      v-bind:key="`${result.title}-${result.imdb_id}`"
    >
      <Result v-bind="result" />
    </li>
  </ul>
</template>

<script>
import Result from "./Result";

export default {
  props: ["results"],
  components: { Result }
};
</script>

<style lang="sass" scoped>
  ul
    padding-top: 5em

  li
    margin-bottom: 4em
</style>
