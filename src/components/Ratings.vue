<template>
  <div>
    <div v-if="rating > 0">
      <RatingStar :rating="rating" minimum="0" maximum="20" />
      <RatingStar :rating="rating" minimum="20" maximum="40" />
      <RatingStar :rating="rating" minimum="40" maximum="60" />
      <RatingStar :rating="rating" minimum="60" maximum="80" />
      <RatingStar :rating="rating" minimum="80" maximum="100" />
      <span class="rating is-size-6">| {{ rating }}%</span>
    </div>
    <div v-else class="rating">
      Unknown
    </div>
  </div>
</template>

<script>
import RatingStar from "./RatingStar.vue";

export default {
  props: ["rating"],
  components: { RatingStar }
};
</script>

<style lang="sass" scoped>

  .rating
    font-weight: bold
</style>
