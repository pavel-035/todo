<script setup>
import { openModal } from 'jenesius-vue-modal'

import projectsApi from '../api'

import BButton from '~/ui/BButton.vue'
import AppModalConfirm from "~/components/AppModalConfirm.vue";

// props & emits
const props = defineProps({
  projectId: {
    type: String,
    required: true
  }
})
const emit = defineEmits('update')

// methods
async function deleteProject () {
  await projectsApi.deleteProject(props.projectId)
}

async function openDeleteProjectModal () {
  const modal = await openModal(AppModalConfirm, {
    title: 'Delete project?'
  })

  modal.on('confirm', () => {
    deleteProject(props.projectId)
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
    @click="openDeleteProjectModal"
  />
</template>

<style scoped></style>