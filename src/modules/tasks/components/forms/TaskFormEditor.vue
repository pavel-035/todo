<script setup>
  import { defineModel } from 'vue'
  import { useTasksStore } from '~/modules/tasks/store/useTasksStore.js'

  import BInput from '~/ui-kit/BInput.vue'
  import BSelect from '~/ui-kit/BSelect.vue'

  // store
  const tasksStore = useTasksStore()

  const taskModel = defineModel('task')
</script>

<template>
  <div class="task-form-create">
    <b-input
      v-model="taskModel.title"
      label="title:"
      placeholder="task 1"
    />

    <b-select
      v-model="taskModel.status_id"
      label="task status:"
      class="mt-2"
      :options="tasksStore.getStatusesList"
    />
  </div>
</template>

<style></style>