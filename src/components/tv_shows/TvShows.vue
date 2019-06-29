<template>
  <section class="section">
    <div class="container">
      <TvShowsList :tv_shows="tv_shows" />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import TvShowsList from "./TvShowsList";

export default {
  name: "tv_shows",
  components: { TvShowsList },

  computed: {
    tv_shows() {
      return this.$store.state.tv_shows.items;
    }
  },

  methods: {
    ...mapActions("tv_shows", ["refresh"])
  },

  created() {
    this.refresh();
  }
};
</script>

