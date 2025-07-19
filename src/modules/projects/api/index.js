import todoDB from "~/indexDB/todoDB/index.js"

async function getProjects () {
    try {
        return await todoDB.projects.getAll()
    } catch (error) {
        console.error(error)
    }
}

async function getProjectById (id) {
    try {
        if (!id) throw new Error("[API] project id not found")

        return await todoDB.projects.getById(id)
    } catch (error) {
        console.error(error)
    }
}

async function createProject (project) {
    try {
        return await todoDB.projects.post(project)
    } catch (error) {
        console.error(error)
    }
}

async function updateProject (id, project) {
    try {
        if (!id) throw Error("[API] project id not found")

        return await todoDB.projects.patch(id, project)
    } catch (error) {
        console.error(error)
    }
}

async function deleteProject (id) {
    try {
        if (!id) throw Error("[API] project id not found")

        return await todoDB.projects.del(id)
    } catch (error) {
        console.error(error)
    }
}

export default { getProjects, getProjectById, createProject, updateProject, deleteProject }