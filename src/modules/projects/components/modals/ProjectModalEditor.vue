<script setup>
  import { reactive, ref } from 'vue'

  import AppModalConfirm from '~/components/AppModalConfirm.vue'
  import ProjectFormEditor from '~/modules/projects/components/forms/ProjectFormEditor.vue'

  // props & emits
  const props = defineProps({
    title: {
      type: String,
      required: true
    }
  })
  const emit = defineEmits(['confirm', 'close'])

  // data
  const initialProject = reactive({
    name: null
  })
  const project = reactive({ ...initialProject })

  // methods
  function resetProject () {
    Object.assign(project, initialProject)
  }

  function confirm () {
    emit('confirm', { ...project })
    resetProject()
    close()
  }
  function cancel () {
    resetProject()
    close()
  }
  function close () {
    emit('close')
  }
</script>

<template>
  <app-modal-confirm
    :title="title"

    @confirm="confirm"
    @cancel="cancel"
  >
    <template #body>
      <project-form-editor
        v-model:project="project"
      />
    </template>
  </app-modal-confirm>
</template>

<style scoped></style>