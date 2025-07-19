const statusesTable = {
    dbPromise: null,

    upgrade (event) {
        const db = event.target.result

        if (!db.objectStoreNames.contains('statuses')) {
            db.createObjectStore('statuses', {
                keyPath: 'id',
                autoIncrement: true
            })
        }

        const tx = event.target.transaction
        const statusesStoreObject = tx.objectStore('statuses')

        if (!statusesStoreObject.indexNames.contains('label')) statusesStoreObject.createIndex('label', 'label', { unique: false })
    },
    init (dbPromise) {
        this.dbPromise = dbPromise
        return this
    },

    async getAll () {
        try {
            const tx = this.dbPromise.transaction('statuses', 'readonly')
            const statusesStoreObject = tx.objectStore('statuses')
            const result = []

            let cursor = await statusesStoreObject.openCursor()

            while (cursor) {
                result.push(cursor.value)
                cursor = await cursor.continue()
            }

            return result
        } catch (error) {
            console.error('[DB] Getting statuses list', error)
            throw error
        }
    },
    async getById (id) {
        try {
            const tx = this.dbPromise.transaction('statuses', 'readonly')
            const statusesStoreObject = tx.objectStore('statuses')
            const response = await statusesStoreObject.get(id)

            return response ?? null
        } catch (error) {
            console.error('[DB] Finding status by ID', error)
            throw error
        }
    },
    async post (status) {
        try {
            const tx = this.dbPromise.transaction('statuses', 'readwrite')
            const statusesStoreObject = tx.objectStore('statuses')
            const response = await statusesStoreObject.add(status)

            return response ?? null
        } catch (error) {
            console.error('[DB] Adding new status', error)
            throw error
        }
    },
    async patch (id, status) {
        try {
            const tx = this.dbPromise.transaction('statuses', 'readwrite')
            const statusesStore = tx.objectStore('statuses')
            const cursor = await statusesStore.openCursor(id)

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

            const tx = this.dbPromise.transaction('statuses', 'readwrite')
            const statusesStore = tx.objectStore('statuses')
            const cursor = await statusesStore.openCursor(id)

            if (cursor) await cursor.delete()

        } catch (error) {
            console.error('[DB] Deleting status', error)
            throw error
        }
    }
}

export default statusesTable