<template>
  <div id="app">
    <Navbar />
    <keep-alive :max="10">
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
    <Bottombar class="is-hidden-desktop" />
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
</style>
