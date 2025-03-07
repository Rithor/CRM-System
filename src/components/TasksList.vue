<script setup lang="ts">
import TaskItem from './TaskItem.vue';
import type { ITodoItem } from '@/types/todo.interface';

type TasksProps = {
  allTasks: ITodoItem[] | undefined;
};
const props = defineProps<TasksProps>();
const emits = defineEmits(['deleteTask', 'updateTaskStatus', 'editTask']);
</script>

<template>
  <div class="container">
    <TransitionGroup class="tasksList" tag="div" name="fade">
      <TaskItem
        class="item"
        v-for="task in props.allTasks"
        :key="task.id"
        :task-item="task"
        @delete-task="emits('deleteTask', $event)"
        @update-task-status="emits('updateTaskStatus', $event)"
        @edit-task="emits('editTask', task, $event)"
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
