import todoDB from './todoDB'

export default {
    async init() {
        try {
            await todoDB.init()
        } catch (error) {
            console.error('Initialization error indexDB:', error)
        }
    }
}