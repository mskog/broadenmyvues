<template>
  <div>
    <div class="tabs is-fullwidth">
      <ul>
        <li v-bind:class="{'is-active': activeTab('watched')}">
          <router-link to="/movies/watched">Watched</router-link>
        </li>
        <li v-bind:class="{'is-active': activeTab('downloads')}">
          <router-link to="/movies/downloads">Downloads</router-link>
        </li>
        <li v-bind:class="{'is-active': activeTab('waitlist')}">
          <router-link to="/movies/waitlist">Waitlist</router-link>
        </li>
      </ul>
    </div>
    <MoviesList :movies="movies"/>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MoviesList from "./MoviesList";

export default {
  props: {
    category: { type: String, default: "watched" }
  },

  data: function() {
    return {
      infiniteState: null,
      page: 1
    };
  },

  computed: {
    movies() {
      return this.$store.state.movies.items;
    }
  },

  methods: {
    ...mapActions("movies", ["refresh", "loadMore"]),

    activeTab(name) {
      return name === this.category;
    },

    infiniteHandler($state) {
      this.page = this.page + 1;
      this.infiniteState = $state;
      this.loadMore(this.category, this.page);
    }
  },

  created() {
    this.refresh(this.category);
  },

  watch: {
    category: function() {
      this.refresh(this.category);
    },
    movies: function() {
      if (this.infiniteState === null) {
        return;
      }
      this.infiniteState.loaded();
    }
  },
  components: { MoviesList }
};
</script>

<style lang="sass" scoped>
  li.is-active
    font-weight: bolder
</style>
