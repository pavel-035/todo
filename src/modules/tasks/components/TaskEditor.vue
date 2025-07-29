<script setup>
import { computed } from "vue";

import { openModal } from 'jenesius-vue-modal'

import tasksApi from '../api'

import BButton from '~/ui-kit/BButton.vue'
import TaskModalEditor from "~/modules/tasks/components/modals/TaskModalEditor.vue";

// props & emits
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  },
  taskId: {
    type: String,
    required: false
  },
  projectId: {
    type: String,
    required: false
  },
  parentId: {
    type: String,
    required: false
  }
})
const emit = defineEmits(['update'])

// computed
const buttonLabel = computed(() => props.isEdit ? 'Edit task' : 'Create task')

// methods
async function createTask (task) {
  await tasksApi.createTask({
    ...task,
    project_id: props.projectId,
    parent_id: props.parentId
  })
  emit('update')
}
async function editTask (task) {
  await tasksApi.updateTask(props.taskId, task)
  emit('update')
}

async function openCreateTaskModal () {
  const modal = await openModal(TaskModalEditor, {
    title: 'Create Task'
  })

  modal.on('confirm', task => {
    createTask(task)
  })
  modal.on('close', task => {
    modal.close()
  })
}
async function openEditTaskModal () {
  if (!props.taskId) return new Error('taskId is required')

  const modal = await openModal(TaskModalEditor, {
    title: 'Edit task'
  })

  modal.on('confirm', task => {
    editTask(task)
  })
  modal.on('close', () => {
    modal.close()
  })
}
</script>

<template>
  <b-button
    :label="buttonLabel"
    @click="isEdit ? openEditTaskModal() : openCreateTaskModal()"
  />
</template>

<style scoped></style>