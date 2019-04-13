<template>
  <div>
    <section
      class="section is-marginless"
      style="padding-bottom: 0; padding-top: 15px"
    >
      <h1 class="title">Episodes</h1>
    </section>
    <section class="section is-paddingless">
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

  created() {
    this.refresh();
  }
};
</script>

