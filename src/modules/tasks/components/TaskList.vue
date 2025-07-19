<script setup></script>

<template>
  <div class="task-list">
    <div class="task-list__wrapper flex justify-between items-start gap-2">
      <task-card
        v-for="task in tasks"
        :key="task.id"

        :task="task"
        class="flex-1/3"
      />
    </div>
  </div>
</template>

<style scoped></style>