<template lang="pug">
  .cream-item()
    .cream(@click="showMore = !showMore")
      .right
        h3 {{ cream.name }}
        span {{ sortPeopleByTaste.length }} persona(s)

    template(v-if="showMore")
      .people()
        .empty(v-if="people.length == 0") No hay personas
        
        .people-item(v-else v-for="person in sortPeopleByTaste" :key="person.id")
          button.delete-people(@click="$emit('deletePerson', { indexProduct, personId: person.id })") x
          .input-taste(@click="$emit('changeTasteSelected', { indexProduct, personId: person.id })")
            .aspect-ratio.aspect-ratio-1by1()
              img.aspect-ratio-item(:src="BASE_URL + tasteList[person.tasteId].img")
          input.input-name(v-model="person.name")
          .input-pay(@click="$emit('changeStatus', { indexProduct, personId: person.id }) " :class="[person.status]")
          

      .actions()
        button(@click="$emit('addPerson', {indexProduct, creamId: cream.id})") Agregar persona
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    cream: {
      type: Object,
      required: true
    },
    people: {
      type: Array,
      required: true
    },
    indexProduct: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      BASE_URL: process.env.BASE_URL,
      showMore: true
    };
  },

  computed: {
    ...mapState(["tasteList"]),
    sortPeopleByTaste() {
      return this.people.sort((a, b) => b.tasteId - a.tasteId);
    }
  }
};
</script>

<style lang="scss" scoped>
.cream-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  .cream-item {
    background: white;
    padding: 8px;
    border-radius: 3px;

    .cream {
      display: block;
      cursor: pointer;
      padding: 16px 8px;
      /* .left {
              flex: 0 0 32px;
              margin-right: 6px;
            } */
      .right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        h3 {
          font-size: 12px;
        }
        span {
          font-size: 10px;
        }
      }
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
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

        .input-taste {
          flex: 0 0 48px;
          cursor: pointer;
          margin-right: 8px;
        }

        .input-pay {
          display: block;
          margin: 0;
          margin-right: 6px;
          height: 32px;
          flex: 0 0 32px;
          border: 1px solid #ccc;
          cursor: pointer;
          border-radius: 2px;

          &.pedido {
            background-color: #efd83e;
          }
          &.entregado {
            background-color: #6fbe6d;
          }
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
</style>
