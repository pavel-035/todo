<script setup>
  const props = defineProps({
    label: {
      type: String,
      default: ''
    }
  })
</script>

<template>
  <button class="b-button cursor-pointer px-3 py-1 border border-gray-300 rounded-md">
    <span class="b-button__label">{{ label }}</span>
  </button>
</template>

<style scoped></style>