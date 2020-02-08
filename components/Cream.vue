<template lang="pug">
  .cream-item()
    .cream(@click="showMore = !showMore")
      .right
        h3 {{ cream.name }}
        span {{ sortPeopleByTaste.length }} persona(s)

    template(v-if="showMore")
      .people()
        .empty(v-if="people.length == 0") No hay personas
        
        H2Person(
          v-else
          v-for="person in sortPeopleByTaste" :key="person.id"
          @deletePerson="({ personId }) => $emit('deletePerson', { indexProduct, personId })"
          @changeTasteSelected="({ personId }) => $emit('changeTasteSelected', { indexProduct, personId })"
          @changeStatus="({ personId }) => $emit('changeStatus', { indexProduct, personId })"
          @changeName="({ value, personId }) => $emit('changeName', { indexProduct, personId, value })"
          :person="person"
        )

      .actions()
        button(@click="$emit('addPerson', {indexProduct, creamId: cream.id})") Agregar persona

</template>

<script>
import { mapState } from "vuex";
import H2Person from "@/components/Person";
export default {
  components: {
    H2Person
  },
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
