const projectsTable = {
    dbPromise: null,

    upgrade (event) {
        const db = event.target.result

        if (!db.objectStoreNames.contains('projects')) {
            db.createObjectStore('projects', {
                keyPath: 'id'
            })
        }

        const tx = event.target.transaction
        const projectsStoreObject = tx.objectStore('projects')

        if (!projectsStoreObject.indexNames.contains('name')) projectsStoreObject.createIndex('name', 'name', { unique: false })
        if (!projectsStoreObject.indexNames.contains('tasks')) projectsStoreObject.createIndex('tasks', 'tasks', { unique: false })
    },

    init (dbPromise) {
        this.dbPromise = dbPromise
        return this
    },

    async getAll () {
        try {
            const tx = this.dbPromise.transaction('projects', 'readonly')
            const projectsStoreObject = tx.objectStore('projects')
            const result = []

            let cursor = await projectsStoreObject.openCursor()

            while (cursor) {
                result.push(cursor.value)
                cursor = await cursor.continue()
            }

            return result
        } catch (error) {
            console.error('[DB] Getting projects list', error)
            throw error
        }
    },
    async getById (id) {
        try {
            const tx = this.dbPromise.transaction('projects', 'readonly')
            const projectsStoreObject = tx.objectStore('projects')
            const response = await projectsStoreObject.get(id)

            return response ?? null
        } catch (error) {
            console.error('[DB] Finding project by ID', error)
            throw error
        }
    },
    async post (project) {
        try {
            const tx = this.dbPromise.transaction('projects', 'readwrite')
            const projectsStoreObject = tx.objectStore('projects')

            project.id = project.id || crypto.randomUUID()

            const response = await projectsStoreObject.add(project)

            return response ?? null
        } catch (error) {
            console.error('[DB] Adding new project', error)
            throw error
        }
    },
    async patch (id, project) {
        try {
            const tx = this.dbPromise.transaction('projects', 'readwrite')
            const projectsStore = tx.objectStore('projects')
            const cursor = await projectsStore.openCursor(id)

            if (cursor) {
                const record = cursor.value;
                const updated = { ...record, ...project, id: record.id };

                await cursor.update(updated)

                return project
            }

            return null
        } catch (error) {
            console.error('[DB] Updating project', error)
            throw error
        }
    },
    async del (id) {
        try {
            const projectToDelete = await this.getById(id)
            if (!projectToDelete) throw new Error(`Task with ID ${id} not found.`)

            const tx = this.dbPromise.transaction('projects', 'readwrite')
            const projectsStore = tx.objectStore('projects')
            const cursor = await projectsStore.openCursor(id)

            if (cursor) await cursor.delete()

        } catch (error) {
            console.error('[DB] Deleting project', error)
            throw error
        }
    }
}

export default projectsTable