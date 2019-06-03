<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  props: [
    "title",
    "imdb_id",
    "imdb_url",
    "overview",
    "year",
    "tmdb_id",
    "downloaded"
  ]
};
</script>

