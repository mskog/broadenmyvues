import Movies from "./components/Movies.vue";
import Episodes from "./components/Episodes.vue";
import Login from "./components/Login.vue";
import MovieDetails from "./components/MovieDetails.vue";

export default [
  {
    name: "login",
    path: "/login",
    component: Login,
    props: true
  },
  {
    name: "movies",
    path: "/",
    component: Movies,
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
  }
];
