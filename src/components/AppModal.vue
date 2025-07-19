<script setup>
import BButton from "~/ui/BButton.vue";

const props = defineProps({
  title: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(['close'])

function close() {
  emit('close', false)
}
</script>

<template>
  <div class="app-modal p-2 bg-white w-1/3 rounded-2xl">
    <div class="app-modal__header flex justify-between align-center">
      <span class="app-modal__title max-w-1/2">{{ title }}</span>
      <b-button
        label="close"
        @click="close"
      />
    </div>
    <div class="app-modal__body my-2">
      <slot name="body"></slot>
    </div>
    <div class="app-modal__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped></style>