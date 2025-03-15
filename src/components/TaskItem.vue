<script setup lang="ts">
import { ref } from 'vue';
import { deleteTodo, updateTodo } from '@/api/todos';
import type { Todo } from '@/types/todos';
import TaskForm from './TaskForm.vue';
import BaseCheckbox from '@/UI/BaseCheckbox.vue';
import BaseButton from '@/UI/BaseButton.vue';
import trashIcon from '@/assets/icons/trash-can-1539321.svg';
import editIcon from '@/assets/icons/edit-5208207.svg';
import confirmIcon from '@/assets/icons/check-yes_v2.svg';
import cancelIcon from '@/assets/icons/cross.svg';

type TaskProps = {
  taskItem: Todo;
};
const props = defineProps<TaskProps>();

const emits = defineEmits(['taskUpdated']);

const isEdit = ref(false);
const isLoading = ref(false);
const editorInput = ref(props.taskItem.title);

const handleUpdateTaskStatus = async () => {
  const updatedTask = {
    isDone: !props.taskItem.isDone,
    title: props.taskItem.title,
  };
  try {
    await updateTodo(props.taskItem.id, updatedTask);
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

const handleEditTask = async () => {
  if (editorInput.value !== props.taskItem.title) {
    const updatedTask = {
      isDone: props.taskItem.isDone,
      title: editorInput.value,
    };
    try {
      isLoading.value = true;
      await updateTodo(props.taskItem.id, updatedTask);
      emits('taskUpdated');
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }
  isEdit.value = false;
};

const handleCancel = () => {
  isEdit.value = false;
  editorInput.value = props.taskItem.title;
};
</script>

<template>
  <div class="taskItem">
    <BaseCheckbox :is-done="taskItem.isDone" @task-status-updated="handleUpdateTaskStatus" />

    <!-- Show the default Todo's UI... -->
    <div v-if="!isEdit" class="taskItemShow">
      <p class="taskItemTitle">{{ taskItem.title }}</p>

      <BaseButton size="md" :icon="editIcon" @click="isEdit = true" />
      <BaseButton
        type="danger"
        size="md"
        :icon="trashIcon"
        :loading="isLoading"
        @click.once="handleDeleteTask"
      />
    </div>

    <!-- OR show Todo editing UI -->
    <div v-else class="taskItemShow">
      <TaskForm :isEdit="true" v-model:form-input="editorInput" @add-task-title="handleEditTask">
        <BaseButton size="md" :icon="confirmIcon" :loading="isLoading" />
      </TaskForm>

      <BaseButton type="danger" size="md" :icon="cancelIcon" @click.once="handleCancel" />
    </div>
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
  /* width: 100%; */
}

.taskItemTitle {
  flex: 1;
  width: 100%;
  line-height: 150%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
