import Movies from "./components/movies/Movies.vue";
import Episodes from "./components/episodes/Episodes.vue";
import EpisodeDetails from "./components/episodes/EpisodeDetails.vue";
import Login from "./components/Login.vue";
import MovieDetails from "./components/movies/MovieDetails.vue";
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
    name: "tv_shows_calendar",
    path: "/tv_shows_calendar",
    component: TvShowsCalendar
  }
];
