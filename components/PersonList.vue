<template lang="pug">
  div.person-container
    .person-list()
      slot
        .empty No hay personas

    .actions()
      button(@click="$emit('addPerson')") Agregar persona

</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.person-container {
  padding: 8px;
  background: white;
}

.person-list {
  .empty {
    padding: 8px 0;
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
</style>