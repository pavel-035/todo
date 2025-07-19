<script setup>
  import { inject } from 'vue'

  const { modals, close } = inject('modalService')

  function onBackdropClick(modal) {
    close(modal.id)
  }

  function onClose(id, payload) {
    close(id, payload)
  }
</script>

<template>
  <Teleport to="body">
    <div
      v-for="modal in modals"
      :key="modal.id"

      class="modal-backdrop fixed inset-0 flex items-center justify-center z-50 bg-black/50"

      @click.self="onBackdropClick(modal)"
    >
      <transition name="modal-fade">
        <component
          :is="modal.component"
          v-bind="modal.props"
          @close="onClose(modal.id, $event)"
        />
      </transition>
    </div>
  </Teleport>
</template>

<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .2s;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
