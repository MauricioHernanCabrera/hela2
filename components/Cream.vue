<template lang="pug">
  .cream-item()
    .cream(@click="showMore = !showMore")
      .right
        h3 {{ cream.name }}
        span {{ sortPeopleByTaste.length }} persona(s)

    h2-person-list(@addPerson="$emit('addPerson', {creamId: cream.id})" v-if="showMore")
      h2-person(
        v-for="person in sortPeopleByTaste" :key="person.id"
        @deletePerson="$emit('deletePerson', { personId:person.id })"
        @changeTasteSelected="$emit('changeTasteSelected', { personId:person.id })"
        @changeStatus="$emit('changeStatus', { personId:person.id })"
        @changeName="({ value }) => $emit('changeName', { personId:person.id, value })"
        :person="person"
      )

</template>

<script>
import { mapState } from "vuex";
import H2Person from "@/components/Person";
import H2PersonList from "@/components/PersonList";
export default {
  components: {
    H2Person,
    H2PersonList
  },

  props: {
    cream: {
      type: Object,
      required: true
    },
    people: {
      type: Array,
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
}
</style>
