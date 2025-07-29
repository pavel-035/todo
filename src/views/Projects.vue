<script setup>
  import { useProjectsStore } from '~/modules/projects/store/useProjectsStore.js'
  import ProjectEditor from '~/modules/projects/components/ProjectEditor.vue'

  // store
  const projectsStore = useProjectsStore()
</script>

<template>
  <div>
    <project-editor @update="projectsStore.fetchProjects()" />
    <projects-list />
  </div>
</template>

<style scoped></style>