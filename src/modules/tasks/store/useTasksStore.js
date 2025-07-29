import { defineStore } from 'pinia'
import tasksApi from "~/modules/tasks/api/index.js";

export const useTasksStore = defineStore('useTasksStore', {
  state: () => {
    return {
      tasks: [],
      statuses: []
    }
  },

  actions: {
    async fetchTasks () {
      try {
        const data = await tasksApi.getTasks()

        this.tasks.splice(0, this.tasks.length, ...data)
      } catch (error) {
        console.error(error)
      }
    },

    async fetchStatuses () {
      try {
        const data = await tasksApi.getStatuses()

        this.statuses.splice(0, this.statuses.length, ...data)
      } catch (error) {
        console.error(error)
      }
    }
  },

  getters: {
    getTasksList (state) {
      return state.tasks
    },
    getTaskById (state) {
      return (id) => {
        return state.tasks.find(task => task.id === id)
      }
    },

    getStatusesList (state) {
      return state.statuses
    },
    getStatusLabelByID (state) {
      return (id) => {
        return state.statuses.find(status => status.id === id).label
      }
    }
  }
})