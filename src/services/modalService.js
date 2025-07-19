import { reactive, readonly, markRaw } from 'vue'

const state = reactive({
  modals: []
})

let uid = 0

function open(component, props = {}, options = {}) {
  return new Promise(resolve => {
    const id = ++uid
    state.modals.push({
      id,
      component: markRaw(component),
      props,
      options,
      resolve
    })
  })
}

function close(id, payload = null) {
  const idx = state.modals.findIndex(m => m.id === id)
  if (idx !== -1) {
    const { resolve } = state.modals[idx]
    resolve(payload)
    state.modals.splice(idx, 1)
  }
}

export function useModalService() {
  return {
    modals: readonly(state.modals),
    open,
    close
  }
}
