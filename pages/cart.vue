<template lang="pug">
  div
    span.empty-cart(v-if="cart.length == 0") No hay helados agregados al carrito :(
    ul.cart(v-else)
      li.cart-item( v-for="(item, indexProduct) in cart" :key="cart.id")
        .header(@click="item.showCreamList = !item.showCreamList")
          .left
            .aspect-ratio.aspect-ratio-1by1
              img.aspect-ratio-item(:src="BASE_URL + item.img")

          .right
            h2 {{ item.name }}
            p 
              | {{ item.people.length }} persona (s)
              span(v-if="item.promo")  - {{ Math.floor(item.people.length / item.promo.personLength) }} promo (s)

        button.delete-product(@click="deleteProduct({ indexProduct })") x
        
        .content(v-show="item.showCreamList")
          .cream-list(v-if="item.type == 'taste'")
            h2-cream(
              v-for="cream in creamList"
              :key="cream.id"
              :cream="cream"
              :people="item.people.filter((person) => person.creamId == cream.id)"
              @deletePerson="(props) => deletePerson({ ...props, indexProduct })"
              @changeTasteSelected="(props) => changeTasteSelected({ ...props, indexProduct })"
              @changeStatus="(props) => changeStatus({ ...props, indexProduct }) "
              @addPerson="(props) => addPerson({ ...props, indexProduct }) "
              @changeName="(props) => changeName({ ...props, indexProduct }) "
            )
          
          h2-person-list(v-else-if="item.type == 'basic'" @addPerson="addPerson({ indexProduct })")
            h2-person(
              v-for="person in item.people" :key="person.id"
              @deletePerson="deletePerson({ indexProduct, personId: person.id })"
              @changeTasteSelected="changeTasteSelected({ indexProduct, personId: person.id })"
              @changeStatus="changeStatus({ indexProduct, personId: person.id })"
              @changeName="(props) => changeName({ ...props, indexProduct, personId: person.id })"
              :person="person"
              :hasChangeStatus="false"
            )

          div(v-else)
            |Por favor limpie su carrito
            nuxt-link(to="/clean") aqui
    
    footer
      span.total Total: 
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
import H2Cream from "@/components/Cream.vue";
import H2Person from "@/components/Person";
import H2PersonList from "@/components/PersonList";
export default {
  name: "CartPage",

  components: {
    H2Cream,
    H2Person,
    H2PersonList
  },

  data() {
    return {
      BASE_URL: process.env.BASE_URL,

      cart: [],

      creamList: [
        {
          id: 1,
          name: "Vainilla",
          showPeople: false
        },
        {
          id: 2,
          name: "Dulce de leche",
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
    this.cart = JSON.parse(JSON.stringify(this.$store.state.cart.cart));
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

    addPerson({ indexProduct, creamId = null }) {
      this.cart[indexProduct].people.push({
        name: "",
        active: false,
        creamId,
        tasteId: 0,
        status: "nada", // [nada, pedido, entregado]
        id: Date.now()
      });
    },

    getIndexPerson({ indexProduct, personId }) {
      return this.cart[indexProduct].people.findIndex(
        ({ id }) => id == personId
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
      this.modal.active = true;
      this.modal.description = `Seguro que deseas cambiar el sabor del hela2: <b>${this.cart[indexProduct].name}</b>?`;

      this.modal.submit = () => {
        const indexPerson = this.getIndexPerson({ indexProduct, personId });

        if (
          this.cart[indexProduct].people[indexPerson].tasteId ==
          this.tasteList.length - 1
        ) {
          this.cart[indexProduct].people[indexPerson].tasteId = 0;
        } else {
          this.cart[indexProduct].people[indexPerson].tasteId++;
        }

        this.modal.active = false;
      };
    },

    changeStatus(props) {
      const { indexProduct, personId } = props;

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

    changeName({ indexProduct, personId, value }) {
      const indexPerson = this.getIndexPerson({ indexProduct, personId });

      this.cart[indexProduct].people[indexPerson].name = value;
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
      return this.cart.reduce((ant, { people, promo, price }) => {
        let total = 0;

        if (promo) {
          const priceWithPromo =
            Math.floor(people.length / promo.personLength) * promo.price;
          total += priceWithPromo;

          const hasOnePersonWithoutPromo = people.length % promo.personLength;
          if (hasOnePersonWithoutPromo) total += price;
        } else {
          const priceWithoutPromo = people.length * price;
          total += priceWithoutPromo;
        }

        return ant + total;
      }, 0);
    },

    hasWarning() {
      return this.cart.filter(({ people, promo = null }) => {
        if (promo) {
          const hasOnePersonWithoutPromo = people.length % promo.personLength;
          return hasOnePersonWithoutPromo;
        } else {
          return false;
        }
      });
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

        p {
          font-size: 10px;
          margin: 0;
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
  .delete-product {
    position: absolute;
    top: 0;
    right: 0px;
    cursor: pointer;
    padding: 8px;
    /* border: 2px solid red; */
  }
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #ccc;
  background: white;

  .total {
    padding: 16px 8px;
    display: flex;
    justify-content: space-between;
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
    margin: 0 20px;
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
        flex: 0 0 calc(50% - 5px);
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
