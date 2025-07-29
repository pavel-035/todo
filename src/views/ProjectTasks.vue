<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, onMounted } from "vue"
import { TaskEditor, TaskList } from "~/modules/tasks";

const route = useRoute()
const router = useRouter()
const isRouterReady = ref(false)

const projectId = computed(() => route.params.projectId)

onMounted(async () => {
  await router.isReady()
  isRouterReady.value = true
})
</script>

<template>
  <div v-if="isRouterReady && projectId">
    <task-editor
      :project-id="projectId"
    />
    <task-list
      is-project-view
      :project-id="projectId"
    />
  </div>
</template>