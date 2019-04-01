<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">Calendar</h1>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div v-for="(value, date, index) in calendarItems" v-bind:key="index">
          <header class="timeline-header">
            <span class="tag is-medium is-primary">
              {{ date }}
            </span>
          </header>
          <div class="timeline">
            <div
              v-for="(episode, index) in value"
              v-bind:key="index"
              class="timeline-item"
            >
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <p>{{ episode.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    calendarItems() {
      return this.$store.state.tv_shows_calendar.data;
    }
  },
  methods: {
    ...mapActions("tv_shows_calendar", ["refresh"])
  },
  created() {
    this.refresh();
  }
};
</script>
