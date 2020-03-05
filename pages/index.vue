<template lang="pug">
  ul.ice-cream-list
    li(class="ice-cream-item" v-for="item in iceCreamListF" :key="item.id")
      .container-img
        .aspect-ratio.aspect-ratio-61by81
          img.aspect-ratio-item(:src="BASE_URL + item.img")
      
      .content
        h3 {{ item.name }}
        p
          span ${{ item.price }}
          span(v-if="item.promo")   - ({{ item.promo.personLength }} * ${{ item.promo.price }})

      .actions
        button(v-show="!item.isExist" @click="ADD_TO_CART(item)") Agregar hela2
        span(v-show="item.isExist") Ya esta en el carro!

</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "HomePage",

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
          promo: {
            personLength: 2,
            price: 190
          },
          people: [],
          type: "taste",
          isExist: false
        },
        {
          id: 2,
          name: "Mc Flurry - Kit kat",
          img: "/images/mc_flurry_kit_kat.png",
          showCreamList: false,
          price: 150,
          promo: null,
          people: [],
          type: "taste",
          isExist: false
        },
        {
          id: 3,
          name: "Mc Flurry - MM",
          img: "/images/mc_flurry_mms.png",
          showCreamList: false,
          price: 150,
          promo: null,
          people: [],
          type: "taste",
          isExist: false
        },
        {
          id: 4,
          name: "Sundae",
          img: "/images/sundae.png",
          showCreamList: false,
          price: 110,
          promo: {
            personLength: 2,
            price: 110
          },
          people: [],
          type: "taste",
          isExist: false
        },
        {
          id: 5,
          name: "Tiramisú",
          img: "/images/tiramisu.png",
          showCreamList: false,
          price: 185,
          promo: null,
          people: [],
          type: "basic",
          isExist: false
        },
        {
          id: 6,
          name: "Banana Cold Cake",
          img: "/images/banana_cold_cake.jpg",
          showCreamList: false,
          price: 185,
          promo: null,
          people: [],
          type: "basic",
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
        isExist: this.cart.some(({ id }) => id == iceCream.id)
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
      text-align: center;
      h3 {
        font-size: 14px;
        line-height: 14px;
        letter-spacing: 0;
        text-align: center;
        margin: 4px;
      }

      p {
        font-size: 10px;
        letter-spacing: 0;
        margin-bottom: 8px;

        span {
          font-size: 10px;
          letter-spacing: 0;
        }
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
