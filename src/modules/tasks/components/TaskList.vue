<script setup>
import { useTasksStore } from '~/modules/tasks/store/useTasksStore.js'
import { onMounted } from "vue";
import TaskCard from "~/modules/tasks/components/TaskCard.vue";

// store
const tasksStore = useTasksStore()

// lifeCycle hooks
onMounted(async () => {
  await tasksStore.fetchStatuses()
  await tasksStore.fetchTasks()
})
</script>

<template>
  <div class="task-list">
    <div class="task-list__wrapper flex justify-between items-start gap-2">
      <task-card
        v-for="task in tasksStore.getTasksList"
        :key="task.id"

        :task="task"
        class="w-[calc(100%/3-(var(--spacing)*2))]"

        @update="tasksStore.fetchTasks"
      />
    </div>
  </div>
</template>

<style scoped></style>