<script setup>
import BCard from "~/ui-kit/BCard.vue";
import BButton from "~/ui-kit/BButton.vue";
import ProjectDel from "~/modules/projects/components/ProjectDel.vue";
import ProjectEditor from "~/modules/projects/components/ProjectEditor.vue";

// props & emits
const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update'])

</script>

<template>
  <b-card class="project-card">
    <template #header>
      <div class="project-card__header">
        <span class="project-card__name">{{ project.name }}</span>
      </div>
    </template>
    <template #footer>
      <div class="project-card__footer flex justify-end gap-1">
        <project-del
          :project-id="project.id"
          @update="emit('update')"
        />
        <project-editor
          :project-id="project.id"
          is-edit
          @update="emit('update')"
        />
        <b-button
          label="open"
        />
      </div>
    </template>
  </b-card>
</template>

<style scoped></style>