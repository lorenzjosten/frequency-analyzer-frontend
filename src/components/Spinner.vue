<script setup lang="ts">
const props = defineProps({
  msg: {
    type: String,
    require: false,
    default: ""
  }
})
</script>

<template>
  <div class="d-inline-flex justify-content-evenly align-content-center spinner">
    <div class="spinner-border m-1 align-content-center" role="status">
      <span class="p-2 visually-hidden">Loading...</span>
    </div>
    <span class="message p-2">{{ msg }}</span>
  </div>
</template>
