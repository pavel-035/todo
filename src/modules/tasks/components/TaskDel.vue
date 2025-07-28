<script setup>
import { openModal } from 'jenesius-vue-modal'

import tasksApi from '../api'

import BButton from '~/ui-kit/BButton.vue'
import AppModalConfirm from "~/components/AppModalConfirm.vue";

// props & emits
const props = defineProps({
  taskId: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update'])

// methods
async function deleteTask () {
  await tasksApi.deleteTask(props.taskId)
}

async function openDeleteTaskModal () {
  const modal = await openModal(AppModalConfirm, {
    title: 'Delete task?'
  })

  modal.on('confirm', async () => {
    await deleteTask(props.taskId)
    emit('update')
    modal.close()
  })
  modal.on('cancel', () => {
    modal.close()
  })
}
</script>

<template>
  <b-button
    label="delete"
    @click="openDeleteTaskModal"
  />
</template>

<style scoped></style>