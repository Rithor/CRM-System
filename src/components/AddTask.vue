<script setup lang="ts">
import { ref, watch } from 'vue';
import { validateTaskTitle } from '@/utils/validation';
import TaskTitleInput from './TaskTitleInput.vue';
import { createTodo } from '@/api/todoAPI_v1';
import LoadingButton from './LoadingButton.vue';

const emits = defineEmits(['newTaskAdded']);

const addTaskInput = ref('');
const isLoading = ref(false);
const validatorMessage = ref('');

const addNewTask = async () => {
  const notValidMsg = validateTaskTitle(addTaskInput.value);
  if (notValidMsg) {
    validatorMessage.value = notValidMsg;
    return;
  }
  isLoading.value = true;
  try {
    await createTodo(addTaskInput.value);
    addTaskInput.value = '';
    emits('newTaskAdded');
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

watch(addTaskInput, () => {
  validatorMessage.value = '';
});
</script>

<template>
  <div class="addTaskContainer">
    <TaskTitleInput
      v-model:task-title-input="addTaskInput"
      v-model:validator-message="validatorMessage"
      @add-task-title="addNewTask()"
    />
    <LoadingButton class="addBtn" :loading="isLoading" @click="addNewTask()">Add</LoadingButton>
  </div>
</template>

<style scoped>
.addTaskContainer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  margin-bottom: 1rem;
}

.addBtn {
  padding: 1rem 3rem;
}
</style>
