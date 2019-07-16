<template>
  <div class="episode columns is-mobile is-variable is-1">
    <div class="column is-one-third">
      <lazy-component>
        <figure class="image is-16by9">
          <router-link :to="`/episodes/details/${episode.id}`">
            <img :src="episode.still | thumb" />
          </router-link>
        </figure>
      </lazy-component>
    </div>
    <div class="column">
      <router-link :to="`/episodes/details/${episode.id}`">
        <h2 class="is-size-7 title">
          {{ episode.episode }}. {{ episode.tmdb_details.name }}
        </h2>
      </router-link>
      <div class="overview is-size-7">{{ truncatedOverview }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["episode"],

  computed: {
    truncatedOverview() {
      if (
        this.episode.tmdb_details === undefined ||
        this.episode.tmdb_details.overview === undefined
      ) {
        return "";
      }
      return this.episode.tmdb_details.overview.substring(0, 50) + "...";
    }
  }
};
</script>

<style lang="sass" scoped>
  @import '../../assets/css/style.sass'

  div.episode
    border-radius: 3px
    h2.title
      margin-bottom: 0

  img.poster
    border-radius: 3px
    box-shadow: 0px 2px 3px rgba(0,0,0,0.75)

  h2
    letter-spacing: 1px

</style>

