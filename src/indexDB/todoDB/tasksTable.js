const tasksTable = {
  dbPromise: null,

  upgrade(event) {
    const db = event.target.result

    if (!db.objectStoreNames.contains('tasks')) {
      db.createObjectStore('tasks', {
        keyPath: 'id'
      })
    }

    const tx = event.target.transaction
    const tasksStoreObject = tx.objectStore('tasks')

    if (!tasksStoreObject.indexNames.contains('title')) tasksStoreObject.createIndex('title', 'title', {unique: false})
    if (!tasksStoreObject.indexNames.contains('status_id')) tasksStoreObject.createIndex('status_id', 'status_id', {unique: false})
    if (!tasksStoreObject.indexNames.contains('project_id')) tasksStoreObject.createIndex('project_id', 'project_id', {unique: false})
    if (!tasksStoreObject.indexNames.contains('parent_id')) tasksStoreObject.createIndex('parent_id', 'parent_id', {unique: false})
    if (!tasksStoreObject.indexNames.contains('tags')) tasksStoreObject.createIndex('tags', 'tags', {unique: false})
    if (!tasksStoreObject.indexNames.contains('subtasks')) tasksStoreObject.createIndex('subtasks', 'subtasks', {unique: false})
    if (!tasksStoreObject.indexNames.contains('created_at')) tasksStoreObject.createIndex('created_at', 'created_at', {unique: false})
    if (!tasksStoreObject.indexNames.contains('updated_at')) tasksStoreObject.createIndex('updated_at', 'updated_at', {unique: false})
  },
  init(dbPromise) {
    this.dbPromise = dbPromise
    return this
  },

  async getAll() {
    try {
      const tx = this.dbPromise.transaction('tasks', 'readonly')
      const tasksStoreObject = tx.objectStore('tasks')
      const result = []

      let cursor = await tasksStoreObject.openCursor()

      while (cursor) {
        result.push(cursor.value)
        cursor = await cursor.continue()
      }

      return result
    } catch (error) {
      console.error('[DB] Getting tasks list', error)
      throw error
    }
  },
  async getById(id) {
    try {
      const tx = this.dbPromise.transaction('tasks', 'readonly')
      const tasksStoreObject = tx.objectStore('tasks')
      const response = await tasksStoreObject.get(id)

      return response ?? null
    } catch (error) {
      console.error('[DB] Finding task by ID', error)
      throw error
    }
  },

  // Получение задачи с её подзадачами
  async getTaskWithSubtasks(taskId) {
    try {
      const tx = this.dbPromise.transaction('tasks', 'readonly')
      const tasksStore = tx.objectStore('tasks')
      const parentIndex = tasksStore.index('parent_id')

      // Получаем основную задачу
      const task = await tasksStore.get(taskId)
      if (!task) return null

      // Получаем все подзадачи
      const subtasks = await parentIndex.getAll(taskId)

      // Рекурсивно получаем подзадачи для каждой подзадачи
      task.subtasks = await Promise.all(
        subtasks.map(async (subtask) => {
          return this.getTaskWithSubtasks(subtask.id)
        })
      )

      return task
    } catch (error) {
      console.error('[DB] Getting task with subtasks', error)
      throw error
    }
  },
  // Получение всех корневых задач с подзадачами
  async getAllRootTasks() {
    try {
      const tx = this.dbPromise.transaction('tasks', 'readonly')
      const tasksStore = tx.objectStore('tasks')
      const parentIndex = tasksStore.index('parent_id')
      const rootTasks = []

      let cursor = await parentIndex.openCursor(null)

      while (cursor) {
        rootTasks.push(cursor.value)
        cursor = await cursor.continue()
      }

      // Для каждой корневой задачи получаем её подзадачи
      const tasksWithSubtasks = await Promise.all(
        rootTasks.map(async (task) => {
          // Получаем все прямые подзадачи для текущей задачи
          let subtasksCursor = await parentIndex.openCursor(task.id)
          const subtasks = []

          while (subtasksCursor) {
            subtasks.push({
              ...subtasksCursor.value,
              subtasks: await this.getTaskWithSubtasks(subtasksCursor.value.id)
            })
            subtasksCursor = await subtasksCursor.continue()
          }

          return {
            ...task,
            subtasks: subtasks
          }
        })
      )

      return tasksWithSubtasks
    } catch (error) {
      console.error('[DB] Getting root tasks', error)
      throw error
    }
  },
  // Получение всех задач проекта
  async getTasksByProjectId(projectId) {
    try {
      const tx = this.dbPromise.transaction('tasks', 'readonly')
      const tasksStore = tx.objectStore('tasks')
      const projectIndex = tasksStore.index('project_id')
      const rootTasks = []

      // Получаем все задачи проекта верхнего уровня
      let cursor = await projectIndex.openCursor(projectId)

      while (cursor) {
        if (!cursor.value.parent_id) {
          rootTasks.push(cursor.value)
        }
        cursor = await cursor.continue()
      }

      // Для каждой корневой задачи получаем её подзадачи
      const tasksWithSubtasks = await Promise.all(
        rootTasks.map(async (task) => {
          return this.getTaskWithSubtasks(task.id)
        })
      )

      return tasksWithSubtasks
    } catch (error) {
      console.error('[DB] Getting tasks by project ID', error)
      throw error
    }
  },
  // Получение всех подзадач задачи
  async getSubtasksByTaskId(taskId) {
    try {
      const tx = this.dbPromise.transaction('tasks', 'readonly')
      const tasksStore = tx.objectStore('tasks')
      const parentIndex = tasksStore.index('parent_id')

      // Получаем все прямые подзадачи для заданного taskId
      const subtasks = await parentIndex.getAll(taskId)

      // Рекурсивно получаем подзадачи для каждой подзадачи
      const subtasksWithChildren = await Promise.all(
        subtasks.map(async (subtask) => {
          return this.getTaskWithSubtasks(subtask.id)
        })
      )

      return subtasksWithChildren
    } catch (error) {
      console.error('[DB] Getting subtasks by task ID', error)
      throw error
    }
  },

  async post(task) {
    try {
      const tx = this.dbPromise.transaction('tasks', 'readwrite')
      const tasksStoreObject = tx.objectStore('tasks')

      task.id = task.id || crypto.randomUUID()
      task.parent_id = task.parent_id || null
      task.created_at = new Date
      task.updated_at = new Date

      const response = await tasksStoreObject.add(task)

      return response ?? null
    } catch (error) {
      console.error('[DB] Adding new task', error)
      throw error
    }
  },
  async patch(id, task) {
    try {
      const tx = this.dbPromise.transaction('tasks', 'readwrite')
      const tasksStore = tx.objectStore('tasks')
      const cursor = await tasksStore.openCursor(id)

      if (cursor) {
        const record = cursor.value

        task.updated_at = new Date

        const updated = {...record, ...task, id: record.id}

        await cursor.update(updated)
        return task
      }
      return null
    } catch (error) {
      console.error('[DB] Updating task', error)
      throw error
    }
  },
  async del(id) {
    try {
      const taskToDelete = await this.getById(id)
      if (!taskToDelete) throw new Error(`Task with ID ${id} not found.`)

      const tx = this.dbPromise.transaction('tasks', 'readwrite')
      const tasksStore = tx.objectStore('tasks')
      const cursor = await tasksStore.openCursor(id)

      if (cursor) await cursor.delete()

    } catch (error) {
      console.error('[DB] Deleting task', error)
      throw error
    }
  },

  // Удаление задачи вместе с подзадачами
  async deleteTaskWithSubtasks(taskId) {
    try {
      const tx = this.dbPromise.transaction('tasks', 'readwrite')
      const tasksStore = tx.objectStore('tasks')
      const parentIndex = tasksStore.index('parent_id')

      // Получаем все подзадачи
      const subtasks = await parentIndex.getAll(taskId)

      // Рекурсивно удаляем все подзадачи
      await Promise.all(
        subtasks.map(async (subtask) => {
          await this.deleteTaskWithSubtasks(subtask.id)
        })
      )

      // Удаляем саму задачу
      await tasksStore.delete(taskId)

      await tx.done
    } catch (error) {
      console.error('[DB] Deleting task with subtasks', error)
      throw error
    }
  },
}

export default tasksTable