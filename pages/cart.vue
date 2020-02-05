<template lang="pug">
  ul.cart
    li.cart-item( v-for="(item, indexProduct) in cart" :key="cart._id")
      .header(@click="item.showTastes = !item.showTastes")
        .left
          .aspect-ratio.aspect-ratio-1by1
            img.aspect-ratio-item(:src="item.img")

        .right
          h2 {{ item.name }}
          span 3 helado (s)
          button x
      
      .content(v-show="item.showTastes")
        ul.cream-list
          li.cream-item(v-for="(taste, indexTaste) in tastes" :key="taste._id")
            .cream
              .left
                .aspect-ratio.aspect-ratio-1by1
                  img.aspect-ratio-item(:src="taste.img")
              .right
                h3 {{ taste.name }}
            
            ul.people
              li.empty No hay personas
              li.people-item(v-for="(person, indexPerson) in item.people" :key="indexPerson" v-if="person.tasteId == taste._id")
                button.delete-people(@click="deletePerson({ indexProduct, indexPerson })") x
                input.input-name(v-model="person.name")
                input.input-pay(type="checkbox" v-model="person.active")

            .actions
              button(@click="addPerson({indexProduct, tasteId: taste._id})") Agregar persona
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      cart: [
        {
          _id: 1,
          name: "Mc Flurry - Oreo",
          img: "/images/mc_flurry_oreo.png",
          showTastes: false,
          people: []
        },
        {
          _id: 2,
          name: "Sundae",
          img: "/images/sundae.png",
          showTastes: false,
          people: []
        }
      ],

      tastes: [
        {
          _id: 1,
          name: "Chocolate",
          img: "/images/chocolate.png",
          showPeople: false
        },
        {
          _id: 2,
          name: "Dulce de leche",
          img: "/images/dulce_de_leche.png",
          showPeople: false
        },
        {
          _id: 3,
          name: "Frutilla",
          img: "/images/frutilla.png",
          showPeople: false
        }
      ]
    };
  },

  mounted() {
    this.SET_TITLE("Ice cart");
  },

  methods: {
    ...mapMutations(["SET_TITLE"]),
    addPerson({ indexProduct, tasteId }) {
      this.cart[indexProduct].people.push({
        name: "",
        active: false,
        tasteId
      });
    },

    deletePerson({ indexProduct, indexPerson }) {
      this.cart[indexProduct].people.splice(indexPerson, 1);
    }
  }

  // computed: {
  //   ...mapState("cart", ["cart"])
  // }
};
</script>

<style lang="scss" scoped>
.cart {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 8px;
  margin: 4px;

  .cart-item {
    position: relative;
    border-radius: 3px;
    box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.2);
    align-self: flex-start;

    .header {
      padding: 12px 8px;
      display: flex;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      background: #f6f6f6;
      cursor: pointer;

      .left {
        flex: 0 0 56px;
        margin-right: 8px;
      }

      .right {
        h2 {
          font-size: 14px;
          letter-spacing: 0;
          margin: 0;
        }

        span {
          display: block;
          font-size: 10px;
        }

        button {
          position: absolute;
          top: 12px;
          right: 8px;
        }
      }
    }

    .content {
      padding: 12px 8px;
      background: #f6f6f6;

      .cream-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;

        .cream-item {
          background: white;
          padding: 8px;
          border-radius: 3px;

          .cream {
            display: flex;
            align-items: center;
            padding-bottom: 8px;
            .left {
              flex: 0 0 32px;
              margin-right: 6px;
            }
            .right {
              h3 {
                font-size: 12px;
              }
            }
          }

          .people {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
            margin-top: 8px;
            margin-bottom: 16px;
            .empty {
              font-size: 12px;
              text-align: center;
            }

            .people-item {
              display: flex;
              align-items: center;
              button {
                flex: 0 0 32px;
                cursor: pointer;
              }
              .input-name {
                border: 0;
                border-bottom: 1px solid #ccc;
                flex-grow: 1;
                margin-right: 12px;
                padding: 8px 0;
              }
              .input-pay {
                /* transform: scale(2); */
                display: block;
                margin: 0;
                margin-right: 6px;
              }
            }
          }

          .actions {
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
          }
        }
      }
    }
  }
}
</style>
