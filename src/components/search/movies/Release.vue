<template>
  <div>
    <div class="columns">
      <b-loading :active="loading" :is-full-page="true"></b-loading>
      <div class="column" v-if="hasAcceptableRelease">
        <h2 class="title is-size-4 ">Best release</h2>
        <div class="columns releases">
          <div class="column is-6">
            {{ this.best_release.joined_attributes }}
            <div v-if="hasKillerRelease">
              <h2 class="title is-size-6">
                This is a killer release
              </h2>
            </div>
          </div>
          <div class="column is-6"></div>
        </div>
      </div>
      <div class="column" v-else>
        <h2 class="title is-size-6">No acceptable release found</h2>
      </div>
    </div>
    <div class="columns">
      <div v-if="!hasKillerRelease" class="column is-6">
        <button
          @click="waitlist(imdb_id)"
          class="button is-small is-primary is-fullwidth"
        >
          Add to Waitlist
        </button>
      </div>

      <div v-else-if="hasAcceptableRelease" class="column is-6">
        <div>
          <button
            @click="download(imdb_id)"
            class="button is-small is-primary is-fullwidth"
          >
            Download
          </button>
        </div>
      </div>
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

