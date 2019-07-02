<template>
  <section class="section">
    <div class="container">
      <TvShowsList :tv_shows="tv_shows" />
      <infinite-loading
        v-if="tv_shows.length > 0"
        @infinite="infiniteHandler"
      ></infinite-loading>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import TvShowsList from "./TvShowsList";

export default {
  name: "tv_shows",
  components: { TvShowsList },

  data: function() {
    return {
      infiniteState: null,
      page: 1
    };
  },

  computed: {
    tv_shows() {
      return this.$store.state.tv_shows.items;
    }
  },

  methods: {
    ...mapActions("tv_shows", ["refresh", "loadMore"]),

    infiniteHandler($state) {
      this.page = this.page + 1;
      this.infiniteState = $state;
      this.loadMore(this.page);
    }
  },

  watch: {
    tv_shows: function() {
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

