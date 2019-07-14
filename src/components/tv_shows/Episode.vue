<template>
  <div class="media">
    <figure class="media-left">
      <p class="image is-128x128">
        <router-link :to="`/episodes/details/${episode.id}`">
          <img :src="episode.still | thumb" />
        </router-link>
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong class="has-text-white">{{ episode | seasonEpisode }} </strong>
          <small> {{ episode.tmdb_details.air_date }}</small>
          <br />
          <small>{{ episode.tmdb_details.name }}</small>
          <small></small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["episode"]
};
</script>

