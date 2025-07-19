const tagsTable = {
    dbPromise: null,

    upgrade (event) {
        const db = event.target.result

        if (!db.objectStoreNames.contains('tags')) {
            db.createObjectStore('tags', {
                keyPath: 'id',
                autoIncrement: true
            })
        }

        const tx = event.target.transaction
        const tagsStoreObject = tx.objectStore('tags')

        if (!tagsStoreObject.indexNames.contains('label')) tagsStoreObject.createIndex('label', 'label', { unique: false })
    },
    init (dbPromise) {
        this.dbPromise = dbPromise
        return this
    },

    async getAll () {
        try {
            const tx = this.dbPromise.transaction('tags', 'readonly')
            const tagsStoreObject = tx.objectStore('tags')
            const result = []

            let cursor = await tagsStoreObject.openCursor()

            while (cursor) {
                result.push(cursor.value)
                cursor = await cursor.continue()
            }

            return result
        } catch (error) {
            console.error('[DB] Getting tags list', error)
            throw error
        }
    },
    async getById (id) {
        try {
            const tx = this.dbPromise.transaction('tags', 'readonly')
            const tagsStoreObject = tx.objectStore('tags')
            const response = await tagsStoreObject.get(id)

            return response ?? null
        } catch (error) {
            console.error('[DB] Finding status by ID', error)
            throw error
        }
    },
    async post (status) {
        try {
            const tx = this.dbPromise.transaction('tags', 'readwrite')
            const tagsStoreObject = tx.objectStore('tags')
            const response = await tagsStoreObject.add(status)

            return response ?? null
        } catch (error) {
            console.error('[DB] Adding new status', error)
            throw error
        }
    },
    async patch (id, status) {
        try {
            const tx = this.dbPromise.transaction('tags', 'readwrite')
            const tagsStore = tx.objectStore('tags')
            const cursor = await tagsStore.openCursor(id)

            if (cursor) {
                const record = cursor.value;
                const updated = { ...record, ...status };

                await cursor.update(updated)
                return status
            }
            return null
        } catch (error) {
            console.error('[DB] Updating status', error)
            throw error
        }
    },
    async del (id) {
        try {
            const statusToDelete = await this.getById(id)
            if (!statusToDelete) throw new Error(`Task with ID ${id} not found.`)

            const tx = this.dbPromise.transaction('tags', 'readwrite')
            const tagsStore = tx.objectStore('tags')
            const cursor = await tagsStore.openCursor(id)

            if (cursor) await cursor.delete()

        } catch (error) {
            console.error('[DB] Deleting status', error)
            throw error
        }
    }
}

export default tagsTable