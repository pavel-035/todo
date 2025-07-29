<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, onMounted } from "vue"
import { TaskEditor, TaskList } from "~/modules/tasks";

// helpers
const route = useRoute()
const router = useRouter()

// data
const isRouterReady = ref(false)
const taskListRef = ref(null) // добавляем ref для TaskList

// computed
const projectId = computed(() => route.params.projectId)
const parentId = computed(() => route.params.taskId)

// lifeCycle hooks
onMounted(async () => {
  await router.isReady()
  isRouterReady.value = true
})

// methods
function handleTaskUpdate () {
  taskListRef.value?.loadTasks()
}
</script>

<template>
  <div v-if="isRouterReady && projectId && parentId">
    <task-editor
      :project-id="projectId"
      :parent-id="parentId"
      @update="handleTaskUpdate"
    />
    <task-list
      ref="taskListRef"

      :key="parentId"

      :project-id="projectId"
      :parent-id="parentId"
    />
  </div>
</template>