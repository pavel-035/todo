<script setup>
  import { useProjectsStore } from '~/modules/projects/store/useProjectsStore.js'
  import { ProjectEditor, ProjectList } from '~/modules/projects'

  // store
  const projectsStore = useProjectsStore()
</script>

<template>
  <div>
    <project-editor @update="projectsStore.fetchProjectsWithTasks()" />
    <project-list />
  </div>
</template>

<style scoped></style>