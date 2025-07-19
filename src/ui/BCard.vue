<script setup>

</script>

<template>
  <div class="app-card px-2 border-gray-200 border-2 rounded-md">
    <div class="app-card__header py-2">
      <slot name="header"></slot>
    </div>
    <div class="app-card__body border-y-2 border-gray-200 py-2">
      <slot></slot>
    </div>
    <div class="app-card__footer py-2">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped></style>