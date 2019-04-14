<template>
  <div id="app">
    <keep-alive include="movies,episodes">
      <router-view></router-view>
    </keep-alive>
    <Bottombar />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Bottombar from "./components/Bottombar";

export default {
  name: "app",
  components: { Navbar, Bottombar }
};
</script>

<style lang="sass" scoped>
  section
    padding-top: 1em
</style>
