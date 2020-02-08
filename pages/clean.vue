<template lang="pug">
  div clean
</template>

<script>
import { mapMutations } from "vuex";

export default {
  mounted() {
    this.SET_CART([]);
  },

  methods: {
    ...mapMutations("cart", ["SET_CART"])
  }
};
</script>

<style lang="scss" scoped>
</style>