<script setup>
import { reactive, ref } from 'vue'

import AppModalConfirm from '~/components/AppModalConfirm.vue'
import ProjectFormEditor from '~/modules/projects/components/forms/ProjectFormEditor.vue'
import TaskFormEditor from "~/modules/tasks/components/forms/TaskFormEditor.vue";

// props & emits
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['confirm', 'close'])

// data
const initialTask = reactive({
  title: null,
  status_id: null
})
const task = reactive({ ...initialTask })

// methods
function resetTask () {
  Object.assign(task, initialTask)
}

function confirm () {
  emit('confirm', { ...task })
  resetTask()
  close()
}
function cancel () {
  resetTask()
  close()
}
function close () {
  emit('close')
}
</script>

<template>
  <app-modal-confirm
    :title="title"

    @confirm="confirm"
    @cancel="cancel"
  >
    <template #body>
      <task-form-editor
        v-model:task="task"
      />
    </template>
  </app-modal-confirm>
</template>

<style scoped></style>