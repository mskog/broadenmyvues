<template>
  <nav
    class="navbar is-transparent is-fixed-top is-hidden-mobile is-hidden-tablet-only is-spaced"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item has-text-white" to="/">
            <span>Movies</span>
          </router-link>
          <router-link class="navbar-item has-text-white" to="/tv_shows">
            <span>TV Shows</span>
          </router-link>
          <router-link class="navbar-item has-text-white" to="/episodes">
            <span>Episodes</span>
          </router-link>
          <router-link class="navbar-item has-text-white" to="/search">
            <span>Search</span>
          </router-link>
          <router-link class="navbar-item has-text-white" to="/calendar">
            <span>Calendar</span>
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <b-field>
              <b-input
                placeholder="Title, imdb_id, imdb_url, etc..."
                expanded
                v-model="query"
                @keyup.native.enter="search"
                @focus="clear"
              ></b-input>
              <p class="control">
                <button class="button is-primary" @click="search">
                  <b-icon pack="fas" icon="search" />
                </button>
              </p>
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      query: ""
    };
  },

  methods: {
    clear() {
      this.query = "";
    },

    search() {
      this.$router.push({ name: "search", query: { q: this.query } });
      this.clear();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/variables.scss";

nav {
  padding-left: 1em;
  background-color: rgba(21, 26, 48, 0.6);

  a {
    text-transform: uppercase;
    color: $white;
    font-weight: bolder;
  }

  a:hover {
    background-color: lighten($background-risen, 20%);
    text-decoration: underline;
  }

  span.icon {
    margin-right: 0.4rem;
  }
}
</style>
