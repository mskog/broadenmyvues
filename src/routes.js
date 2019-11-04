import Movies from "./components/movies/Movies.vue";
import Search from "./components/search/Search.vue";
import MoviesSearchDetails from "./components/search/movies/ResultDetailsContainer.vue";
import TvShowsSearchDetails from "./components/search/tv_shows/ResultDetailsContainer.vue";
import Episodes from "./components/episodes/Episodes.vue";
import EpisodeDetails from "./components/episodes/EpisodeDetails.vue";
import Login from "./components/Login.vue";
import MovieDetails from "./components/movies/MovieDetails.vue";
import TvShows from "./components/tv_shows/TvShows.vue";
import TvShowDetailsContainer from "./components/tv_shows/TvShowDetailsContainer.vue";
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
    name: "search",
    path: "/search",
    component: Search,
    props: true
  },
  {
    name: "search_movies_details",
    path: "/search/movies/details/:imdb_id",
    component: MoviesSearchDetails,
    props: true
  },
  {
    name: "search_tv_shows_details",
    path: "/search/tv_shows/details/:imdb_id",
    component: TvShowsSearchDetails,
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
    path: "/tv_shows/:category?",
    component: TvShows,
    props: true
  },
  {
    name: "tv_show_details",
    path: "/tv_shows/details/:id",
    component: TvShowDetailsContainer,
    props: true
  },
  {
    name: "calendar",
    path: "/calendar",
    component: TvShowsCalendar
  }
];
