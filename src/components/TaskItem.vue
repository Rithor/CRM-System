<script setup lang="ts">
import type { ITodoItem } from '@/types/todo.interface';
import { ref } from 'vue';
import { deleteTodo, updateTodo } from '@/api/todoAPI_v1';
import TaskCheckbox from './TaskCheckbox.vue';
import TaskEditor from './TaskEditor.vue';
import LoadingButton from './LoadingButton.vue';

type TaskProps = {
  taskItem: ITodoItem;
};
const props = defineProps<TaskProps>();

const emits = defineEmits(['taskUpdated']);

const isEditTask = ref(false);
const isLoading = ref(false);

const handleUpdateTaskStatus = async () => {
  const updatedTask = {
    isDone: !props.taskItem.isDone,
    title: props.taskItem.title,
  };
  try {
    await updateTodo(updatedTask, props.taskItem.id);
    emits('taskUpdated');
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteTask = async () => {
  try {
    isLoading.value = true;
    await deleteTodo(props.taskItem.id);
    emits('taskUpdated');
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="taskItem">
    <TaskCheckbox :is-done="taskItem.isDone" @task-status-updated="handleUpdateTaskStatus" />

    <div v-if="!isEditTask" class="taskItemShow">
      <p class="taskItemTitle">{{ taskItem.title }}</p>
      <button class="btn taskBtn" @click="isEditTask = true">
        <img class="taskBtnIcon" src="../assets/icons/edit-5208207.svg" alt="edit button" />
      </button>
      <LoadingButton
        class="taskBtn taskBtn-delete"
        :loading="isLoading"
        @click.once="handleDeleteTask"
      >
        <img class="taskBtnIcon" src="../assets/icons/trash-can-1539321.svg" alt="delete button" />
      </LoadingButton>
    </div>

    <TaskEditor
      v-else
      :taskItem
      @task-title-updated="emits('taskUpdated')"
      v-model:is-edit-task="isEditTask"
    />
  </div>
</template>

<style scoped>
.taskItem {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-radius: var(--border-radius);
  background-color: var(--color-background);
  box-shadow: 5px 5px 5px var(--color-background-mute);
}

.taskItemShow {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.taskItemTitle {
  flex: 1;
  line-height: 150%;
}

.taskBtn {
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.taskBtn-delete {
  background-color: var(--color-second);
}

.taskBtnIcon {
  width: 1.25rem;
}
</style>
