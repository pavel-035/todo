import { createRouter, createWebHistory } from 'vue-router'

import Projects from '~/views/Projects.vue'
import ProjectTasks from '~/views/ProjectTasks.vue'
import Task from '~/views/Task.vue'

const routes = [
  {
    path: '/',
    redirect: '/projects'
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/projects/:projectId',
    name: 'ProjectTasks',
    component: ProjectTasks
  },
  {
    path: '/projects/:projectId/task/:taskId',
    name: 'TaskDetails',
    component: Task
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
