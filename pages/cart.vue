<template lang="pug">
  div
    span.empty-cart(v-if="cart.length == 0") No hay helados agregados al carrito :(
    ul.cart(v-else)
      li.cart-item( v-for="(item, indexProduct) in cart" :key="cart.id")
        .header(@click="item.showCreamList = !item.showCreamList")
          .left
            .aspect-ratio.aspect-ratio-1by1
              img.aspect-ratio-item(:src="item.img")

          .right
            h2 {{ item.name }}
            span {{ item.people.length }} helado (s) - {{ Math.floor(item.people.length / 2) }} promo (s)
            button(@click="deleteProduct({ indexProduct })") x
        
        .content(v-show="item.showCreamList")
          .cream-list
            cream(
              :cream="creamList[0]"
              :indexProduct="indexProduct"
              :people="item.people.filter((person) => person.creamId == 1)"
              @deletePerson="deletePerson"
              @changeTasteSelected="changeTasteSelected"
              @changeStatus="changeStatus"
              @addPerson="addPerson"
            )

            cream(
              :cream="creamList[1]"
              :indexProduct="indexProduct"
              :people="item.people.filter((person) => person.creamId == 2)"
              @deletePerson="deletePerson"
              @changeTasteSelected="changeTasteSelected"
              @changeStatus="changeStatus"
              @addPerson="addPerson"
            )
    
    
    footer
      span Total: 
        b ${{calculateTotal}}
      
      div.warning(v-if="hasWarning.length")
        h5 Advertencia
        ul
          li(v-for="item in hasWarning" :key="item.id") 
            | Falta un 
            b {{ item.name }} 
            | para otra promo
    
    .modal(v-if="modal.active")
      .content
        p.description(v-html="modal.description")
        .actions
          button.close(@click="modal.active = false") cancelar
          button.accept(@click="modal.submit") aceptar
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Cream from "@/components/Cream.vue";
export default {
  components: {
    Cream
  },

  data() {
    return {
      cart: JSON.parse(JSON.stringify(this.$store.state.cart.cart)),

      creamList: [
        {
          id: 1,
          name: "Dulce de leche",
          showPeople: false
        },
        {
          id: 2,
          name: "Vainilla",
          showPeople: false
        }
      ],

      modal: {
        active: false,
        description: "",
        submit: () => {}
      }
    };
  },

  mounted() {
    this.SET_TITLE("Ice cart");
  },

  watch: {
    cart: {
      handler(val) {
        this.SET_CART(JSON.parse(JSON.stringify(this.cart)));
      },
      deep: true
    }
  },

  methods: {
    ...mapMutations(["SET_TITLE"]),
    ...mapMutations("cart", ["SET_CART"]),

    addPerson({ indexProduct, creamId }) {
      this.cart[indexProduct].people.push({
        name: "",
        active: false,
        creamId,
        tasteId: 1,
        status: "nada", // [nada, pedido, entregado]
        id: Date.now()
      });
    },

    getIndexPerson({ indexProduct, personId }) {
      return this.cart[indexProduct].people.findIndex(
        person => person.id == personId
      );
    },

    deletePerson({ indexProduct, personId }) {
      const indexPerson = this.getIndexPerson({ indexProduct, personId });

      this.modal.active = true;
      this.modal.description = `Seguro que deseas eliminar a la persona: <b>${this.cart[indexProduct].people[indexPerson].name}</b>?`;
      this.modal.submit = () => {
        this.cart[indexProduct].people.splice(indexPerson, 1);
        this.modal.active = false;
      };
    },

    changeTasteSelected({ indexProduct, personId }) {
      const indexPerson = this.getIndexPerson({ indexProduct, personId });

      if (
        this.cart[indexProduct].people[indexPerson].tasteId ==
        this.tasteList.length - 1
      ) {
        this.cart[indexProduct].people[indexPerson].tasteId = 0;
      } else {
        this.cart[indexProduct].people[indexPerson].tasteId++;
      }
    },

    changeStatus({ indexProduct, personId }) {
      const indexPerson = this.getIndexPerson({ indexProduct, personId });

      const { status } = this.cart[indexProduct].people[indexPerson];

      let newStatus = "";
      switch (status) {
        case "nada": {
          newStatus = "pedido";
          break;
        }
        case "pedido": {
          newStatus = "entregado";
          break;
        }
        case "entregado": {
          newStatus = "nada";
          break;
        }
      }

      this.cart[indexProduct].people[indexPerson].status = newStatus;
    },

    deleteProduct({ indexProduct }) {
      this.modal.active = true;

      this.modal.description = `Seguro que deseas eliminar el producto: <b>${this.cart[indexProduct].name}</b>?`;
      this.modal.submit = () => {
        this.cart.splice(indexProduct, 1);
        this.modal.active = false;
      };
    }
  },

  computed: {
    ...mapState(["tasteList"]),

    calculateTotal() {
      return this.cart.reduce((ant, act) => {
        const promos = Math.floor(act.people.length / 2) * act.promo;
        let total = promos;

        const hasOnePersonWithoutPromo = act.people.length % 2;
        if (hasOnePersonWithoutPromo) total += act.price;

        return ant + total;
      }, 0);
    },

    hasWarning() {
      return (
        this.cart.filter(item => {
          const hasOnePersonWithoutPromo = item.people.length % 2;
          return hasOnePersonWithoutPromo;
        }) || []
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.empty-cart {
  padding: 10px;
  display: block;
  font-size: 12px;
}
.cart {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 8px;
  margin: 4px;
  margin-bottom: 137px;

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
          top: 4px;
          right: 4px;
          padding: 4px;
          cursor: pointer;
        }
      }
    }

    .content {
      background: #f6f6f6;
      .cream-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
      }
    }
  }
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #ccc;
  background: white;

  span {
    padding: 16px 8px;
    display: block;
  }

  .warning {
    background-color: #efd83e;
    padding: 16px 8px;
    h5 {
      margin: 0;
      font-weight: 700;
      margin-bottom: 8px;
      font-size: 14px;
    }
    ul {
      list-style-type: circle;
      padding-left: 18px;
      li {
        font-size: 12px;
      }
    }
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    max-width: 350px;
    background: white;
    padding: 32px;
    border-radius: 3px;
    .description {
      margin-bottom: 32px;
    }
    .actions {
      display: flex;
      justify-content: space-between;
      button {
        cursor: pointer;
        padding: 5px 10px;
        border-width: 2px;
        border-style: solid;

        &.close {
          border-color: #ccc;
        }
        &.accept {
          border-color: #6fbe6d;
          background: #6fbe6d;
          color: white;
        }
      }
    }
  }
}
</style>
