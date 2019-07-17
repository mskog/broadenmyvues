<template>
  <div id="app">
    <keep-alive :max="10">
      <router-view :key="$route.fullPath"></router-view>
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
