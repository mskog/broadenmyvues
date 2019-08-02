<template>
  <div class="episodes">
    <b-tabs>
      <b-tab-item
        v-for="season in episodesBySeason"
        v-bind:key="`season-${season[0]}`"
        :label="'Season ' + season[0]"
      >
        <lazy-component>
          <ul>
            <li v-for="episode in season[1]" v-bind:key="episode.id">
              <Episode :episode="episode" />
            </li>
          </ul>
        </lazy-component>
      </b-tab-item>
    </b-tabs>
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

<style lang="scss">
.b-tabs > .tab-content {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>


