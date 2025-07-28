import todoDB from "~/indexDB/todoDB/index.js"

async function getTasks () {
    try {
        return await todoDB.tasks.getAll()
    } catch (error) {
        console.error(error)
    }
}

async function getTaskById (id) {
    try {
        if (!id) throw new Error("[API] task id not found")

        return await todoDB.tasks.getById(id)
    } catch (error) {
        console.error(error)
    }
}

async function createTask (task) {
    try {
        return await todoDB.tasks.post(task)
    } catch (error) {
        console.error(error)
    }
}

async function updateTask (id, task) {
    try {
        if (!id) throw Error("[API] task id not found")

        return await todoDB.tasks.patch(id, task)
    } catch (error) {
        console.error(error)
    }
}

async function deleteTask (id) {
    try {
        if (!id) throw Error("[API] task id not found")

        return await todoDB.tasks.del(id)
    } catch (error) {
        console.error(error)
    }
}


async function getStatuses () {
  try {
    return await todoDB.statuses.getAll()
  } catch (error) {
    console.error(error)
  }
}

export default { getTasks, getTaskById, createTask, updateTask, deleteTask, getStatuses }