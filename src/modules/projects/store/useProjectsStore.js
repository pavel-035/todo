import { defineStore } from 'pinia'
import projectsApi from "~/modules/projects/api/index.js";

export const useProjectsStore = defineStore('useProjectsStore', {
  state: () => {
    return {
      projects: []
    }
  },

  actions: {
    async fetchProjects () {
      try {
        const data = await projectsApi.getProjects()

        this.projects.splice(0, this.projects.length, ...data)
      } catch (error) {
        console.error(error)
      }
    }
  },

  getters: {
    getProjectsList (state) {
      return state.projects
    }
  }
})