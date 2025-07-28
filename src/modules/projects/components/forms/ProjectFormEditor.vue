<script setup>
  import { defineModel } from 'vue'
  import BInput from '~/ui-kit/BInput.vue'

  const projectModel = defineModel('project')
</script>

<template>
  <div class="project-form-create">
    <b-input
      v-model="projectModel.name"
      label="name:"
      placeholder="project 1"
    />
  </div>
</template>

<style scoped></style>