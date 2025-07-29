import todoDB from "~/indexDB/todoDB/index.js"

async function getTasks() {
  try {
    return await todoDB.tasks.getAllRootTasks()
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getTaskById(id) {
  try {
    if (!id) throw new Error("[API] task id is required")

    return await todoDB.tasks.getTaskWithSubtasks(id)
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getTasksByProjectId(projectId) {
  try {
    if (!projectId) throw new Error("[API] task is required")

    return await todoDB.tasks.getTasksByProjectId(projectId)
  } catch (error) {
    console.error(error)
    throw error
  }
}
async function getSubtasksByTaskId(projectId) {
  try {
    if (!projectId) throw new Error("[API] task is required")

    return await todoDB.tasks.getSubtasksByTaskId(projectId)
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function createTask(task) {
  try {
    return await todoDB.tasks.post(task)
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function updateTask(id, task) {
  try {
    if (!id) throw Error("[API] task id not found")

    return await todoDB.tasks.patch(id, task)
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function deleteTask(id) {
  try {
    if (!id) throw Error("[API] task id is required")

    return await todoDB.tasks.deleteTaskWithSubtasks(id)
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getStatuses() {
  try {
    return await todoDB.statuses.getAll()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default { getTasks, getTaskById, getSubtasksByTaskId, createTask, updateTask, deleteTask, getStatuses, getTasksByProjectId }