<template lang="pug">
  .person-item()
    button.delete-people(@click="$emit('deletePerson', { personId: person.id })") x
    
    .input-taste(@click="$emit('changeTasteSelected', { personId: person.id })")
      .aspect-ratio.aspect-ratio-1by1()
        img.aspect-ratio-item(:src="BASE_URL + tasteList[person.tasteId].img")
    
    input.input-name(:value="person.name" @input="(event) => $emit('changeName', { value: event.target.value, personId: person.id })")
    
    .input-pay(@click="$emit('changeStatus', { personId: person.id }) " :class="[person.status]")

</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    person: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      BASE_URL: process.env.BASE_URL
    };
  },

  computed: {
    ...mapState(["tasteList"])
  }
};
</script>

<style lang="scss" scoped>
.person-item {
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
    flex: 0 0 32px;
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
</style>