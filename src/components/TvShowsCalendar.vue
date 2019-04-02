<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Calendar</h1>
      <div class="timeline is-centered">
        <template v-for="(value, date, index) in calendarItems">
          <header :key="index" class="timeline-header">
            <span class="tag is-large is-primary"> {{ date }} </span>
          </header>
          <div
            v-for="(item, index) in value"
            v-bind:key="index"
            class="timeline-item"
          >
            <div class="timeline-marker"></div>
            <div class="timeline-content" style="width: 100%">
              <figure class="poster image">
                <img :src="getPoster(item.show.ids.tmdb)" />
              </figure>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    calendarItems() {
      return this.$store.state.tv_shows_calendar.data;
    }
  },
  methods: {
    ...mapActions("tv_shows_calendar", ["refresh"]),
    ...mapActions("posters", ["loadPoster"]),

    getPoster(tmdb_id) {
      const poster = this.$store.state.posters.tv_show[tmdb_id];
      if (poster !== undefined) {
        return poster;
      } else {
        this.loadPoster({ tmdb_id, type: "tv_show" });
      }
    }
  },
  created() {
    this.refresh();
  }
};
</script>
