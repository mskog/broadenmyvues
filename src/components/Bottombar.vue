<template>
  <nav
    class="navbar is-fixed-bottom"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <div class="navbar-item">
        <span class="has-text-centered">
          <router-link to="/">
            <span
              v-bind:class="{
                active: this.$route.path.includes('movies')
              }"
            >
              <b-icon pack="fas" icon="film" size="is-medium" />
              <div class="is-size-6">Movies</div>
            </span>
          </router-link>
        </span>
      </div>
      <div class="navbar-item">
        <span class="has-text-centered">
          <router-link to="/episodes">
            <span
              v-bind:class="{
                active: currentRouteName() === 'episodes'
              }"
            >
              <b-icon pack="fas" icon="tv" size="is-medium" />
              <div class="is-size-6">Episodes</div>
            </span>
          </router-link>
        </span>
      </div>
      <div class="navbar-item">
        <span class="has-text-centered">
          <router-link to="/tv_shows_calendar">
            <span
              v-bind:class="{
                active: currentRouteName() === 'tv_shows_calendar'
              }"
            >
              <b-icon pack="fas" icon="calendar" size="is-medium" />
              <div class="is-size-6">Calendar</div>
            </span>
          </router-link>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    currentRouteName() {
      return this.$route.name;
    }
  }
};
</script>


<style lang="sass" scoped>
  @import '../assets/css/variables.sass'

  nav
    background: $background
    padding-left: 1em

  .navbar-item
    color: $title-color

  span.active
    color: $white

</style>

