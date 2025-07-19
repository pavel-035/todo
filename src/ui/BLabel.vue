<script setup>

  const props = defineProps({
    label: {
      type: String,
      required: true
    }
  })

</script>

<template>
  <div class="b-label border-2 border-gray-200 rounded-full w-fit px-2">
    <span class="b-label__name">{{ label }}</span>
  </div>
</template>

<style scoped></style>