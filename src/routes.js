import Movies from "./components/Movies.vue";
import Episodes from "./components/Episodes.vue";
import Login from "./components/Login.vue";

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
    name: "episodes",
    path: "/episodes",
    component: Episodes
  }
];
