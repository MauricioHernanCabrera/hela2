<template lang="pug">
  div
    nav
      div
        nuxt-link(to="/" v-show="$route.name != 'index'") ←
        span {{ title }}
      nuxt-link(to="/cart") cart
        
    nuxt
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["title"])
  }
};
</script>

<style lang="scss" scoped>
nav {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  padding: 12px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;

    a {
      text-decoration: none;
      display: block;
      padding: 4px;
    }
    span {
      font-size: 24px;
      font-weight: 700;
    }
  }

  button {
  }
}
</style>
