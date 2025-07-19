const tasksTable = {
    dbPromise: null,

    upgrade (event) {
        const db = event.target.result

        if (!db.objectStoreNames.contains('tasks')) {
            db.createObjectStore('tasks', {
                keyPath: 'id'
            })
        }

        const tx = event.target.transaction
        const tasksStoreObject = tx.objectStore('tasks')

        if (!tasksStoreObject.indexNames.contains('title')) tasksStoreObject.createIndex('title', 'title', { unique: false })
        if (!tasksStoreObject.indexNames.contains('status_id')) tasksStoreObject.createIndex('status_id', 'status_id', { unique: false })
        if (!tasksStoreObject.indexNames.contains('tags')) tasksStoreObject.createIndex('tags', 'tags', { unique: false })
        if (!tasksStoreObject.indexNames.contains('subtasks')) tasksStoreObject.createIndex('subtasks', 'subtasks', { unique: false })
        if (!tasksStoreObject.indexNames.contains('createdAt')) tasksStoreObject.createIndex('createdAt', 'createdAt', { unique: false })
        if (!tasksStoreObject.indexNames.contains('updatedAt')) tasksStoreObject.createIndex('updatedAt', 'updatedAt', { unique: false })
    },
    init (dbPromise) {
        this.dbPromise = dbPromise
        return this
    },

    async getAll () {
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
    async getById (id) {
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
    async post (task) {
        try {
            const tx = this.dbPromise.transaction('tasks', 'readwrite')
            const tasksStoreObject = tx.objectStore('tasks')

            task.id = task.id || crypto.randomUUID()
            task.createdAt = new Date
            task.updatedAt = new Date

            const response = await tasksStoreObject.add(task)

            return response ?? null
        } catch (error) {
            console.error('[DB] Adding new task', error)
            throw error
        }
    },
    async patch (id, task) {
        try {
            const tx = this.dbPromise.transaction('tasks', 'readwrite')
            const tasksStore = tx.objectStore('tasks')
            const cursor = await tasksStore.openCursor(id)

            if (cursor) {
                const record = cursor.value;

                task.updatedAt = new Date

                const updated = { ...record, ...task, id: record.id };

                await cursor.update(updated)
                return task
            }
            return null
        } catch (error) {
            console.error('[DB] Updating task', error)
            throw error
        }
    },
    async del (id) {
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
    }
}

export default tasksTable