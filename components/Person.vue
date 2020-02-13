<template lang="pug">
  .person-item()
    button.delete-people(@click="$emit('deletePerson')") x
    
    .input-taste(v-if="hasChangeStatus" @click="$emit('changeTasteSelected')")
      .aspect-ratio.aspect-ratio-1by1()
        img.aspect-ratio-item(:src="BASE_URL + tasteList[person.tasteId].img")
    
    input.input-name(:value="person.name" @input="changeName")
    
    .input-pay(@click="$emit('changeStatus') " :class="[person.status]")

</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    person: {
      type: Object,
      required: true
    },

    hasChangeStatus: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      BASE_URL: process.env.BASE_URL
    };
  },

  computed: {
    ...mapState(["tasteList"])
  },

  methods: {
    changeName(event) {
      this.$emit("changeName", { value: event.target.value });
    }
  }
};
</script>

<style lang="scss" scoped>
.person-item {
  display: flex;
  align-items: center;
  background: white;
  padding: 4px 0;
  margin-bottom: 2px;

  &:last-of-type {
    margin-bottom: 24px;
  }

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