<script setup lang="ts">
import { ref, watch } from 'vue';
import TaskTitleInput from './TaskTitleInput.vue';
import { validateTaskTitle } from '@/utils/validation';
import { updateTodo } from '@/api/todoAPI_v1';
import type { ITodoItem } from '@/types/todo.interface';
import LoadingButton from './LoadingButton.vue';

type TaskProps = {
  taskItem: ITodoItem;
};
const props = defineProps<TaskProps>();

const emits = defineEmits(['taskTitleUpdated']);

const isEditTask = defineModel('isEditTask');

const taskEditorInput = ref(props.taskItem.title);
const validatorMessage = ref('');
const isLoading = ref(false);

const handleEditTask = async () => {
  const notValidMsg = validateTaskTitle(taskEditorInput.value);
  if (notValidMsg) {
    validatorMessage.value = notValidMsg;
    return;
  }
  if (taskEditorInput.value !== props.taskItem.title) {
    const updatedTask = {
      isDone: props.taskItem.isDone,
      title: taskEditorInput.value,
    };
    try {
      isLoading.value = true;
      await updateTodo(updatedTask, props.taskItem.id);
      emits('taskTitleUpdated');
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }
  isEditTask.value = false;
};

const handleCancel = () => {
  isEditTask.value = false;
  taskEditorInput.value = props.taskItem.title;
};

watch(taskEditorInput, () => {
  validatorMessage.value = '';
});
</script>

<template>
  <div class="taskItemShow">
    <TaskTitleInput
      :isEdit="true"
      v-model:task-title-input="taskEditorInput"
      v-model:validator-message="validatorMessage"
    />
    <LoadingButton class="taskBtn" @click="handleEditTask" :loading="isLoading">
      <img class="taskBtnIcon" src="../assets/icons/check-yes_v2.svg" alt="edit button"
    /></LoadingButton>
    <button class="btn taskBtn taskBtn-delete" @click.once="handleCancel">
      <img class="taskBtnIcon" src="../assets/icons/cross.svg" alt="delete button" />
    </button>
  </div>
</template>

<style scoped>
.taskBtn {
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.taskBtnIcon {
  width: 1.25rem;
}

.taskBtn-delete {
  background-color: var(--color-second);
}
</style>
