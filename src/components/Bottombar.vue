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
                active: this.$route.path.includes('movies/')
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
          <router-link to="/tv_shows">
            <span
              v-bind:class="{
                active: this.$route.path.includes('tv_shows')
              }"
            >
              <b-icon pack="fas" icon="tv" size="is-medium" />
              <div class="is-size-6">Shows</div>
            </span>
          </router-link>
        </span>
      </div>
      <div class="navbar-item">
        <span class="has-text-centered">
          <router-link to="/episodes">
            <span
              v-bind:class="{
                active: this.$route.path.includes('episodes')
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
          <router-link to="/search">
            <span
              v-bind:class="{
                active: this.$route.path.includes('search')
              }"
            >
              <b-icon pack="fas" icon="search" size="is-medium" />
              <div class="is-size-6">Search</div>
            </span>
          </router-link>
        </span>
      </div>
      <div class="navbar-item">
        <span class="has-text-centered">
          <router-link to="/calendar">
            <span
              v-bind:class="{
                active: this.$route.path.includes('calendar')
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

  .navbar-item
    color: $title-color
    padding: 0.3rem
    width: 20%

  span.active
    color: $white

</style>

