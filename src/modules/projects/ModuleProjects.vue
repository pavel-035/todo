<script setup>
  import { useProjectsStore } from '~/modules/projects/store/useProjectsStore.js'

  import ProjectList from './components/ProjectList.vue'
  import ProjectEditor from '~/modules/projects/components/ProjectEditor.vue'

  // store
  const projectsStore = useProjectsStore()
</script>

<template>
  <div class="module-project">
    <div class="module-project__header mb-4">
      <project-editor
        @update="projectsStore.fetchProjects()"
      />
    </div>

    <project-list />
  </div>
</template>

<style scoped></style>