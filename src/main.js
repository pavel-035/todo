import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import indexDB from "./indexDB";

const app = createApp(App)

// components and ui registration
const vueFiles = import.meta.glob(
    ['./components/**/*.vue', './ui/**/*.vue'],
    { eager: true }
)

Object.entries(vueFiles).forEach(([path, module]) => {
    const name = path
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')

    app.component(name, module.default)
})

// modules registration
const moduleIndexes = import.meta.glob(
    './modules/**/index.js',
    { eager: true }
)

Object.values(moduleIndexes).forEach(mod => {
    const map = mod.default || {}

    Object.entries(map).forEach(([name, component]) => {
        app.component(name, component)
    })
})

async function initApp() {
    await indexDB.init()

    app.mount('#app')
}

initApp()
