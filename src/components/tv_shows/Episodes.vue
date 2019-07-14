<template>
  <div>
    <div
      class="row"
      v-for="season in episodesBySeason"
      v-bind:key="`season-${season[0]}`"
    >
      <b-collapse :open="numberOfSeasons == season[0]">
        <h2 slot="trigger" class="title">Season {{ season[0] }}</h2>
        <ul>
          <li v-for="episode in season[1]" v-bind:key="episode.id">
            <Episode :episode="episode" />
          </li>
        </ul>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import groupby from "lodash.groupby";
import Episode from "./Episode";

export default {
  components: { Episode },
  props: ["episodes"],

  computed: {
    episodesBySeason() {
      return Object.entries(
        groupby(this.episodes, episode => episode.season)
      ).reverse();
    },

    numberOfSeasons() {
      return new Set(this.episodes.map(episode => episode.season)).size;
    }
  }
};
</script>

