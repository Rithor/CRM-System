<script setup lang="ts">
import type { Todo } from '@/types/todos';
import TaskItem from './TaskItem.vue';

type TasksProps = {
  tasks: Todo[];
};
defineProps<TasksProps>();

const emits = defineEmits(['taskUpdated']);
</script>

<template>
  <div class="container">
    <TransitionGroup class="tasksList" tag="div" name="fade">
      <TaskItem
        class="item"
        v-for="task in tasks"
        :key="task.id"
        :task-item="task"
        @task-updated="emits('taskUpdated')"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.tasksList {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  width: 100%;
  box-sizing: border-box;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-leave-active {
  position: absolute;
}
</style>
