<template lang="pug">
  ul.ice-cream-list
    li(class="ice-cream-item" v-for="item in iceCreamListF" :key="item.id")
      .container-img
        .aspect-ratio.aspect-ratio-1by1
          img.aspect-ratio-item(:src="BASE_URL + item.img")
      
      .content
        h3 {{ item.name }}

      .actions
        button(v-show="!item.isExist" @click="ADD_TO_CART(item)") Agregar hela2
        span(v-show="item.isExist") Ya esta en el carro!

</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      BASE_URL: process.env.BASE_URL,
      iceCreamList: [
        {
          id: 1,
          name: "Mc Flurry - Oreo",
          img: "/images/mc_flurry_oreo.png",
          showCreamList: false,
          price: 135,
          promo: 190,
          people: [],
          isExist: false
        },
        {
          id: 2,
          name: "Sundae",
          img: "/images/sundae.png",
          showCreamList: false,
          price: 105,
          promo: 105,
          people: [],
          isExist: false
        }
      ]
    };
  },

  mounted() {
    this.SET_TITLE("Hela2");
  },

  methods: {
    ...mapMutations("cart", ["ADD_TO_CART"]),
    ...mapMutations(["SET_TITLE"])
  },

  computed: {
    ...mapState("cart", ["cart"]),
    iceCreamListF() {
      return this.iceCreamList.map(iceCream => ({
        ...iceCream,
        isExist: this.cart.some(product => product.id == iceCream.id)
      }));
    }
  }
};
</script>

<style lang="scss" scoped>
.ice-cream-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 4px;
  margin: 4px;

  .ice-cream-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 12px 12px 12px;
    border-radius: 3px;
    box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.1);

    .container-img {
      margin-bottom: 12px;
    }

    .content {
      h3 {
        font-size: 14px;
        letter-spacing: 0;
        text-align: center;
        margin-bottom: 8px;
      }
    }

    .actions {
      text-align: center;

      button {
        width: 100%;
        border-radius: 3px;
        color: white;
        padding: 8px 0;
        font-size: 12px;
        letter-spacing: 0;
        background-color: #6fbe6d;
        cursor: pointer;
        display: block;
      }

      span {
        padding: 8px 0;
        display: block;
        font-size: 12px;
        letter-spacing: 0;
      }
    }
  }
}
</style>
