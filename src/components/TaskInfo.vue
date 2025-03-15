<script setup lang="ts">
import { TodoFilter, type TodoInfo } from '@/types/todos';

type InfoProps = {
  taskInfo: TodoInfo;
  activeCategory: TodoFilter;
};
defineProps<InfoProps>();

const emits = defineEmits(['filterChanged']);

const filterLabel: Record<TodoFilter, string> = {
  all: 'Все',
  inWork: 'В работе',
  completed: 'Сделано',
};
</script>

<template>
  <nav class="container">
    <ul class="statusBar">
      <li
        v-for="(label, filter) in filterLabel"
        :key="filter"
        :class="{ statusBarActive: activeCategory === filter }"
        @click="emits('filterChanged', filter)"
      >
        {{ label }}({{ taskInfo[filter] }})
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.statusBar {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-bottom: 0;
}

.statusBar li {
  font-size: 1.5rem;
  font-weight: 700;
  transition: all 0.2s;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }

  &:active {
    transform: scale(0.9);
  }
}

.statusBarActive {
  color: var(--color-primary);
  text-decoration: underline;
}
</style>
