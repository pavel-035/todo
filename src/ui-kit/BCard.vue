<script setup>
  import { useSlots } from 'vue'

  const slots = useSlots()
</script>

<template>
  <div class="app-card px-2 border-gray-200 border-2 rounded-md">
    <div
      v-if="slots.header"
      class="app-card__header  border-b-2 border-gray-200 py-2"
    >
      <slot name="header"></slot>
    </div>
    <div class="app-card__body py-2">
      <slot></slot>
    </div>
    <div
      v-if="slots.footer"
      class="app-card__footer border-t-2 border-gray-200 py-2"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped></style>