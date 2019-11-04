<template>
  <section class="section">
    <div class="container">
      <div class="tabs is-fullwidth">
        <ul>
          <li v-bind:class="{ 'is-active': activeTab('watching') }">
            <router-link to="/tv_shows/watching">Watching</router-link>
          </li>
          <li v-bind:class="{ 'is-active': activeTab('not_watching') }">
            <router-link to="/tv_shows/not_watching">Not watching</router-link>
          </li>
          <li v-bind:class="{ 'is-active': activeTab('ended') }">
            <router-link to="/tv_shows/ended">Ended</router-link>
          </li>
        </ul>
      </div>
      <TvShowsList :tv_shows="tv_shows" />
      <infinite-loading v-if="tv_shows.length > 0" @infinite="infiniteHandler"
        ><span slot="no-more"></span
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

  props: {
    category: { type: String, default: "watching" }
  },

  data: function() {
    return {
      infiniteState: null,
      page: 1
    };
  },

  computed: {
    tv_shows() {
      return this.$store.state.tv_shows.items;
    },

    complete() {
      return this.$store.state.tv_shows.complete;
    }
  },

  methods: {
    ...mapActions("tv_shows", ["refresh", "loadMore"]),

    activeTab(name) {
      return name === this.category;
    },

    infiniteHandler($state) {
      this.infiniteState = $state;
      this.loadMore(this.category);
    }
  },

  watch: {
    tv_shows: function() {
      if (this.infiniteState === null) {
        return;
      }
      this.infiniteState.loaded();
    },

    complete: function() {
      if (this.$store.state.tv_shows.complete) {
        console.log("complete");
        this.infiniteState.loaded();
        this.infiniteState.complete();
      }
    }
  },

  activated() {
    if (this.category !== this.$store.state.tv_shows.category) {
      this.refresh(this.category);
    }
  },

  created() {
    this.refresh(this.category);
  }
};
</script>

