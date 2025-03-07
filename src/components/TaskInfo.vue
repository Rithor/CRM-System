<script setup lang="ts">
import type { ITodoInfo } from '@/types/todo.interface';

type InfoProps = {
  taskInfo: ITodoInfo | undefined;
  activeCategory: string;
};
const props = defineProps<InfoProps>();
const emits = defineEmits(['showAll', 'showInWork', 'showCompleted']);
</script>

<template>
  <nav class="container">
    <ul class="statusBar">
      <li :class="{ statusBarActive: props.activeCategory === 'All' }" @click="emits('showAll')">
        Все({{ props.taskInfo?.all }})
      </li>
      <li
        :class="{ statusBarActive: props.activeCategory === 'inWork' }"
        @click="emits('showInWork')"
      >
        В работе({{ props.taskInfo?.inWork }})
      </li>
      <li
        :class="{ statusBarActive: props.activeCategory === 'completed' }"
        @click="emits('showCompleted')"
      >
        Сделано({{ props.taskInfo?.completed }})
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.statusBar {
  display: flex;
  gap: 1.4rem;
  justify-content: center;
  padding-bottom: 0;
}

.statusBar li {
  font-size: 1.5rem;
  font-weight: 700;
  transition: all 0.2s;
  cursor: pointer;

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
