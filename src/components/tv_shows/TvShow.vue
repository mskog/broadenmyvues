<template>
  <div class="tv_show_content columns is-mobile">
    <div class="column is-3-desktop is-4-table is-4-mobile">
      <lazy-component
        @show="
          loadPoster({ type: 'tv_show', tmdb_id: tv_show.tmdb_details.id })
        "
      >
        <router-link :to="`/tv_shows/details/${tv_show.id}`">
          <img
            :src="getPoster('tv_show', tv_show.tmdb_details.id) | thumb(240)"
            class="poster image"
          />
        </router-link>
      </lazy-component>
    </div>
    <div class="column title">
      <router-link :to="`/tv_shows/details/${tv_show.id}`">
        <h2 class="is-size-5 title">{{ tv_show.name }}</h2>
        <h2 class="subtitle ratings">
          <Ratings :rating="rating" />
        </h2>
      </router-link>
      <div class="is-size-7">
        <div class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <b-icon pack="fa" icon="calendar" size="is-small"></b-icon>
              <span>{{ tv_show.tmdb_details.first_air_date }}</span>
            </div>
            <div class="level-item">
              <b-icon pack="fa" icon="flag" size="is-small"></b-icon>
              <span>{{ tv_show.tmdb_details.origin_country[0] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ratings from "../movies/Ratings";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["tv_show"],
  components: { Ratings },
  computed: {
    ...mapGetters("posters", ["getPoster"]),

    truncatedSummary() {
      if (this.tv_show.summary === null) {
        return "";
      }
      return this.tv_show.summary.substring(0, 90) + "...";
    },

    rating() {
      return Math.round(this.tv_show.tmdb_details.vote_average * 10);
    }
  },
  methods: {
    ...mapActions("posters", ["loadPoster"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/style.scss";

div.tv_show_content {
  background: $background-risen;
  border-radius: 5px;
  position: relative;
  height: 10rem;
  box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.75);
}

img.poster {
  bottom: 2rem;
  height: 100%;
  max-width: 30%;
  position: absolute;
  border-radius: 7px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.75);
}

.download {
  position: absolute;
  right: 15px;
  top: 15px;
}

.title {
  padding-top: 0.7rem;
}

h2 {
  letter-spacing: 1px;
}

h2.subtitle.ratings {
  font-size: 0.8rem;
  color: orange;
  margin-bottom: 0.5rem;
}
</style>

