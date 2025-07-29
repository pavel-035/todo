<script setup>
import {ref, useAttrs} from "vue";

const attrs = useAttrs()

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
})

const value = ref(props.modelValue)
</script>

<template>
  <div class="b-input">
    <div class="b-input__wrapper">
      <label>{{ label }}</label>
      <input
        v-model="value"
        class="b-input__target block mt-1 w-full px-2 py-1 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        v-bind="attrs"
      />
    </div>
  </div>
</template>

<style scoped></style>