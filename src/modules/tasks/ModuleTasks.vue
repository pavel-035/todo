<script setup>
  import { useTasksStore } from '~/modules/tasks/store/useTasksStore.js'

  import TaskList from "~/modules/tasks/components/TaskList.vue";
  import TaskEditor from "~/modules/tasks/components/TaskEditor.vue";

  // store
  const tasksStore = useTasksStore()

</script>

<template>
  <task-editor @update="tasksStore.fetchTasks()" />
  <task-list />
</template>

<style></style>