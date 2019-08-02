<template>
  <div class="tv_shows">
    <div class="columns is-multiline">
      <div
        v-for="tv_show in tv_shows"
        v-bind:key="tv_show.id"
        class="tv_show column is-half"
      >
        <TvShow :tv_show="tv_show" class="columns is-mobile"></TvShow>
      </div>
    </div>
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

<style lang="scss" scoped>
.tv_shows {
  margin-top: 3rem;
}

.tv_show {
  padding-top: 4rem;
  padding-right: 2rem;
}
</style>
