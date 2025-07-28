<script setup>
  import { onMounted } from 'vue'
  import { useProjectsStore } from '~/modules/projects/store/useProjectsStore.js'

  import ProjectCard from './ProjectCard.vue'


  // store
  const projectsStore = useProjectsStore()

  // lifeCycle
  onMounted(async () => {
    await projectsStore.fetchProjects()
  })
</script>

<template>
  <div class="project-list">
    <div class="project-list__wrapper flex flex-wrap align-items-center gap-2">
      <project-card
        v-for="project in projectsStore.getProjectsList"
        :key="project.id"

        :project="project"
        class="w-[calc(100%/3-(var(--spacing)*2))]"

        @update="projectsStore.fetchProjects()"
      />
    </div>
  </div>
</template>

<style scoped></style>