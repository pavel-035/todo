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
  },
  options: {
    type: Array,
    default: () => []
  }
})

const value = ref(props.modelValue)
</script>

<template>
  <div class="b-select">
    <div class="b-select__wrapper">
      <label>{{ label }}</label>
      <select
        v-model="value"
        class="b-select__target block mt-1 w-full px-2 py-1 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        v-bind="attrs"
      >
        <option
          v-for="(option, index) of options"
          :key="index"
          :value="option.id"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped></style>