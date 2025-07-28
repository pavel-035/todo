<script setup>

import BCard from "~/ui-kit/BCard.vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
    validator(value) {
      return ['id', 'title', 'status', 'tags', 'subtasks', 'createdAt', 'updatedAt']
        .every(key => value.hasOwnProperty(key))
    }
  }
})

</script>

<template>
  <b-card class="task-card">
    <template #header>
      <div class="task-card__header flex justify-between align-items-center">
        <span class="task-card__name">{{ task.title }}</span>
        <div v-if="task.status" class="task-card__status">
          <b-label :label="task.status" />
        </div>
      </div>
    </template>
    <template #default>
      <div class="task-card__body">
        <div class="task-card__tags flex align-items-center wrap gap-1">
          <b-label
            v-for="tag in task.tags"
            :key="tag.id"

            :label="tag.label"
          />
        </div>

        <b-tree
          v-if="task.subtasks"

          :data="task.subtasks"
          label-key="title"
          children-key="subtasks"

          class="my-2"
        />

      </div>
    </template>
    <template #footer>
      <div class="task-card__footer flex justify-end gap-1">
        <b-button label="delete"/>
        <b-button label="edit"/>
        <b-button label="open"/>
      </div>
    </template>
  </b-card>
</template>

<style scoped></style>