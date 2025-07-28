<script setup>
  import { computed } from "vue";

  import { openModal } from 'jenesius-vue-modal'

  import projectsApi from '../api'

  import BButton from '~/ui/BButton.vue'
  import ProjectModalEditor from '~/modules/projects/components/modals/ProjectModalEditor.vue'

  // props & emits
  const props = defineProps({
    isEdit: {
      type: Boolean,
      default: false
    },
    projectId: {
      type: String,
      required: false
    }
  })
  const emit = defineEmits(['update'])

  // computed
  const buttonLabel = computed(() => props.isEdit ? 'Edit Project' : 'Create Project')

  // methods
  async function createProject (project) {
    await projectsApi.createProject(project)
    emit('update')
  }
  async function editProject (project) {
    await projectsApi.updateProject(props.projectId, project)
    emit('update')
  }

  async function openCreateProjectModal () {
    const modal = await openModal(ProjectModalEditor, {
      title: 'Create Project'
    })

    modal.on('confirm', project => {
      createProject(project)
    })
    modal.on('close', project => {
      modal.close()
    })
  }
  async function openEditProjectModal () {
    if (!props.projectId) return new Error('projectId is required')

    const modal = await openModal(ProjectModalEditor, {
      title: 'Edit project'
    })

    modal.on('confirm', project => {
      editProject(project)
    })
    modal.on('close', project => {
      modal.close()
    })
  }
</script>

<template>
  <b-button
    :label="buttonLabel"
    @click="isEdit ? openEditProjectModal() : openCreateProjectModal()"
  />
</template>

<style scoped></style>