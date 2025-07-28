import { openDB } from 'idb'
import projectsTable from './projectsTable.js'
import tasksTable from './tasksTable.js'
import statusesTable from './statusesTable.js'
import tagsTable from "~/indexDB/todoDB/tagsTable.js";

const DB_NAME = 'todo'
const DB_VERSION = 6

const todoDB = {
    dbPromise: null,
    projects: null,
    tasks: null,
    statuses: null,
    tags: null,

    init: async function () {
        try {
            this.dbPromise = await openDB(DB_NAME, DB_VERSION, {
                upgrade (db, oldVersion, newVersion, transaction, event) {
                    projectsTable.upgrade(event)
                    tasksTable.upgrade(event)
                    statusesTable.upgrade(event)
                    tasksTable.upgrade(event)
                }
            })

            // инициализация модулей хранилищ
            this.projects = projectsTable.init(this.dbPromise)
            this.tasks = tasksTable.init(this.dbPromise)
            this.statuses = statusesTable.init(this.dbPromise)
            this.tags = tagsTable.init(this.dbPromise)
        } catch (error) {
            console.error('ERROR: failed to open database:', error)
        }
    }
}

export default todoDB