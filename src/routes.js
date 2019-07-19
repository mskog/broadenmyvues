import Movies from "./components/movies/Movies.vue";
import MoviesSearch from "./components/movies_search/MoviesSearch.vue";
import MoviesSearchDetails from "./components/movies_search/ResultDetailsContainer.vue";
import Episodes from "./components/episodes/Episodes.vue";
import EpisodeDetails from "./components/episodes/EpisodeDetails.vue";
import Login from "./components/Login.vue";
import MovieDetails from "./components/movies/MovieDetails.vue";
import TvShows from "./components/tv_shows/TvShows.vue";
import TvShowDetails from "./components/tv_shows/TvShowDetails.vue";
import TvShowsCalendar from "./components/calendar/TvShowsCalendar.vue";

export default [
  {
    name: "login",
    path: "/login",
    component: Login,
    props: true
  },
  {
    path: "/",
    redirect: "/movies/watched"
  },
  {
    name: "movies_search",
    path: "/movies_search",
    component: MoviesSearch,
    props: true
  },
  {
    name: "movies_search_details",
    path: "/movies_search/details/:imdb_id",
    component: MoviesSearchDetails,
    props: true
  },
  {
    name: "movies",
    path: "/movies/:category?",
    component: Movies,
    props: true
  },
  {
    name: "moviedetails",
    path: "/movies/details/:id",
    component: MovieDetails,
    props: true
  },
  {
    name: "episodes",
    path: "/episodes",
    component: Episodes
  },
  {
    name: "episodedetails",
    path: "/episodes/details/:id",
    component: EpisodeDetails,
    props: true
  },
  {
    name: "tv_shows",
    path: "/tv_shows",
    component: TvShows
  },
  {
    name: "tv_show_details",
    path: "/tv_shows/details/:id",
    component: TvShowDetails,
    props: true
  },
  {
    name: "calendar",
    path: "/calendar",
    component: TvShowsCalendar
  }
];
