<template>
  <nav
    class="navbar is-fixed-top is-hidden-mobile is-hidden-tablet-only is-spaced"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item has-text-white" to="/">
            <b-icon pack="fas" icon="film" />
            <span>Movies</span>
          </router-link>
          <router-link class="navbar-item has-text-white" to="/tv_shows">
            <b-icon pack="fas" icon="tv" />
            <span>TV Shows</span>
          </router-link>
          <router-link class="navbar-item has-text-white" to="/episodes">
            <b-icon pack="fas" icon="tv" />
            <span>Episodes</span>
          </router-link>
          <router-link class="navbar-item has-text-white" to="/search">
            <b-icon pack="fas" icon="tv" />
            <span>Search</span>
          </router-link>
          <router-link class="navbar-item has-text-white" to="/calendar">
            <b-icon pack="fas" icon="calendar" />
            <span>Calendar</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="sass" scoped>
@import '../assets/css/variables.sass'

nav
  padding-left: 1em
  background: $background-risen

  a:visited
    background-color: $background-risen

  a:hover
    background-color: lighten($background-risen, 20%)

  span.icon
    margin-right: 0.4rem
</style>
