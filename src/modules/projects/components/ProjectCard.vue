<script setup>

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

</script>

<template>
  <b-card class="project-card">
    <template #header>
      <div class="project-card__header">
        <span class="project-card__name">{{ name }}</span>
      </div>
    </template>
    <template #footer>
      <div class="project-card__footer flex justify-end gap-1">
        <b-button label="delete"/>
        <b-button label="edit"/>
        <b-button label="open"/>
      </div>
    </template>
  </b-card>
</template>

<style scoped></style>