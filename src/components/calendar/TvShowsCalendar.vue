<template>
  <div>
    <b-loading :active="loading" :is-full-page="true"></b-loading>
    <section class="section">
      <div class="container">
        <div class="timeline is-centered">
          <template v-for="(value, date, index) in calendarItems">
            <header :key="index" class="timeline-header">
              <span class="tag is-large is-primary">
                {{ date | futureDate }}
              </span>
            </header>
            <div
              v-for="(item, index) in value"
              :key="date + index"
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    calendarItems() {
      return this.$store.state.tv_shows_calendar.data;
    },
    loading() {
      return this.$store.getters["tv_shows_calendar/hasData"];
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
