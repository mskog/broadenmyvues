<template>
  <div>
    <b-loading :active="loading" :is-full-page="false"></b-loading>
    <div v-if="hasAcceptableRelease">
      <h2 class="title is-size-6 is-marginless">Best release</h2>
      <div class="is-size-7 releases">
        {{ this.best_release.joined_attributes }}
        <div v-if="hasKillerRelease">
          This is a killer release
        </div>
        <button @click="download(imdb_id)" class="button is-small is-primary">
          Download
        </button>
      </div>
    </div>
    <div v-else>
      <h2 class="title is-size-6">No acceptable release found</h2>
      <button @click="waitlist(imdb_id)" class="button is-small is-primary">
        Add to Waitlist
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "imdb_id",
    "has_killer_release",
    "has_acceptable_release",
    "best_release"
  ],
  data() {
    return {
      loading: false
    };
  },
  computed: {
    hasAcceptableRelease() {
      return this.has_acceptable_release;
    },
    hasKillerRelease() {
      return this.has_killer_release;
    }
  },
  methods: {
    download() {
      this.loading = true;
      this.$store.dispatch("movies_search/download", this.imdb_id).then(() => {
        this.$router.push("/movies/downloads");
      });
    },
    waitlist() {
      this.loading = true;
      this.$store.dispatch("movies_search/waitlist", this.imdb_id).then(() => {
        this.$router.push("/movies/waitlist");
      });
    }
  }
};
</script>


};
</script>

