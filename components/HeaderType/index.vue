<template>
  <div class="header-type-wrapper">
    <div class="header-type-wrapper-innerBox">
      <div class="header-item" v-for="(item, index) in typeData" :key="index">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    typeData: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>
