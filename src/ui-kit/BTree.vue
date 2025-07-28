<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  childrenKey: {
    type: String,
    default: 'children'
  }
})
</script>

<template>
  <ul class="b-tree list-disc pl-5">
    <li
      v-for="node in data"
      :key="node.id"

      class="b-tree__item"
    >
      <span>{{ node[labelKey] }}</span>
      <BTree
        v-if="node[childrenKey] && node[childrenKey].length"

        :data="node[childrenKey]"
        :label-key="labelKey"
        :children-key="childrenKey"
      />
    </li>
  </ul>
</template>

<style scoped></style>