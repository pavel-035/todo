<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import tasksApi from '../api'
import { useTasksStore } from '~/modules/tasks/store/useTasksStore.js'

import TaskCard from '~/modules/tasks/components/TaskCard.vue'

// helpers
const route = useRoute()

// props
const props = defineProps({
  projectId: {
    type: String,
    required: false
  },
  parentId: {
    type: String,
    required: false
  }
})

// store
const tasksStore = useTasksStore()

// data
const tasks = ref([])

// lifeCycle hooks
onMounted(async () => {
  await tasksStore.fetchStatuses()
  await loadTasks()
})

// computed
const currentTaskId = computed(() => route.params.taskId)

// methods
const loadTasks = async () => {
  if (props.projectId && props.parentId) {
    // Если есть parentId, загружаем подзадачи конкретной задачи
    tasks.value = await tasksApi.getSubtasksByTaskId(props.parentId)
  } else if (props.projectId) {
    // Если есть только projectId, загружаем все задачи проекта верхнего уровня
    tasks.value = await tasksApi.getTasksByProjectId(props.projectId)
  }
}

defineExpose({
  loadTasks
})
</script>

<template>
  <div class="task-list">
    <div class="task-list__wrapper flex items-start gap-2">
      <div
        v-for="task in tasks"
        :key="task.id"

        class="w-[calc(100%/3-(var(--spacing)*2))]"
      >
        <task-card
          :task="task"
          @update="loadTasks"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>