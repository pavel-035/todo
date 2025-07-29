<script setup>
import { useTasksStore } from "~/modules/tasks/store/useTasksStore.js";

import BCard from "~/ui-kit/BCard.vue";
import TaskEditor from "~/modules/tasks/components/TaskEditor.vue";
import TaskDel from "~/modules/tasks/components/TaskDel.vue";
import BButton from "~/ui-kit/BButton.vue";

// store
const tasksStore = useTasksStore()

// props & emit
const props = defineProps({
  task: {
    type: Object,
    required: true,
    // validator(value) {
    //   return ['id', 'title', 'status', 'subtasks', 'created_at', 'updated_at']
    //     .every(key => value.hasOwnProperty(key))
    // }
  }
})
const emit = defineEmits(['update'])

// methods
// route для перехода к подзадаче
const getFullTaskPath = (task) => {
  if (task.parentId) {
    const parentTask = tasksStore.getTaskById(task.parentId)

    return `${getFullTaskPath(parentTask)}/${task.id}`
  }

  return task.id
}

</script>

<template>
  <b-card class="task-card">
    <template #header>
      <div class="task-card__header flex justify-between align-items-center">
        <span class="task-card__name">{{ task.title }}</span>
        <div v-if="task.status" class="task-card__status">
          <b-label :label="tasksStore.getStatusLabelByID(task.status_id)" />
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
        <task-editor
          is-edit
          :task-id="task.id"
          @update="emit('update')"
        />
        <task-del
          :task-id="task.id"
          @update="emit('update')"
        />
        <router-link
          :to="{
            name: 'TaskDetails',
            params: {
              projectId: task.project_id,
              taskId: getFullTaskPath(task)
            }
          }"
        >
          <b-button
            label="open"
          />
        </router-link>
      </div>
    </template>
  </b-card>
</template>

<style scoped></style>