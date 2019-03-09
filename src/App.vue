<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <router-view></router-view>
        <Bottombar />
      </div>
    </section>
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
