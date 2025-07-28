<script setup>
  import { useSlots } from 'vue'

  import BButton from '~/ui/BButton.vue'

  // helpers
  const slots = useSlots()

  // props & emits
  const props = defineProps({
    title: { type: String, required: true }
  })
  const emit = defineEmits(['confirm', 'cancel'])

  // methods
  function confirm () {
    emit('confirm')
    emit('close')
  }
  function cancel () {
    emit('cancel')
    emit('close')
  }
</script>

<template>
  <div class="project-modal bg-white p-2 rounded-2xl overflow-hidden max-w-lg w-full">
    <div class="project-modal__header">
      {{ title }}
    </div>

    <div
      v-if="slots.body"
      class="project-modal__body py-3"
    >
      <slot name="body"></slot>
    </div>

    <div class="project-modal__footer">
      <div class="project-modal__footer flex items-center justify-end gap-2">
        <b-button
          label="cancel"
          @click="cancel"
        />
        <b-button
          label="confirm"
          @click="emit('confirm')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>