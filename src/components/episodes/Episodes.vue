<template>
  <div>
    <section class="section">
      <div class="container">
        <EpisodesList :episodes="episodes" />
        <infinite-loading
          v-if="episodes.length > 0"
          @infinite="infiniteHandler"
        ></infinite-loading>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import EpisodesList from "./EpisodesList";

export default {
  name: "episodes",
  components: { EpisodesList },

  data: function() {
    return {
      infiniteState: null,
      page: 1
    };
  },

  computed: {
    episodes() {
      return this.$store.state.episodes.items;
    }
  },

  methods: {
    ...mapActions("episodes", ["refresh", "loadMore"]),

    infiniteHandler($state) {
      this.page = this.page + 1;
      this.infiniteState = $state;
      this.loadMore(this.page);
    }
  },

  watch: {
    episodes: function() {
      if (this.infiniteState === null) {
        return;
      }
      this.infiniteState.loaded();
    }
  },

  created() {
    this.refresh();
  }
};
</script>

