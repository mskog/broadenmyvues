<template>
  <nav class="navbar is-fixed-bottom" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <span class="has-text-centered">
          <router-link to="/">
            <span v-bind:class="{'active': currentRouteName() === 'movies'}">
              <b-icon pack="fas" icon="film" size="is-medium"/>
              <div class="is-size-7">Movies</div>
            </span>
          </router-link>
        </span>
      </div>
      <div class="navbar-item">
        <span class="has-text-centered">
          <router-link to="/episodes">
            <span v-bind:class="{'active': currentRouteName() === 'episodes'}">
              <b-icon pack="fas" icon="tv" size="is-medium"/>
              <div class="is-size-7">Episodes</div>
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

