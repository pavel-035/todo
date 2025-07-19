<script setup></script>

<template>
  <div class="project-list">
    <div class="project-list__wrapper flex justify-between items-center gap-2">
      <project-card
        v-for="project in projects"
        :key="project.id"

        :id="project.id"
        :name="project.name"
        class="flex-1/3"
      />
    </div>
  </div>
</template>

<style scoped></style>