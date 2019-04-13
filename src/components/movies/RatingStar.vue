<template>
  <b-icon :pack="pack" :icon="icon" size="is-small"></b-icon>
</template>

<script>
export default {
  props: ["rating", "minimum", "maximum"],

  computed: {
    pack() {
      if (this.rating >= this.minimum) {
        return "fa";
      } else {
        return "far";
      }
    },

    icon() {
      if (this.rating >= this.maximum) {
        return "star";
      } else if (this.rating >= this.minimum) {
        return "star-half";
      } else {
        return "star";
      }
    }
  }
};
</script>
