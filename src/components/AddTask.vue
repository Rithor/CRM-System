<script setup lang="ts">
import { ref, watch } from 'vue';
import { validateTaskTitle } from '@/utils/validation';
import TaskTitleInput from './TaskTitleInput.vue';
import { createTodo } from '@/api/todoAPI_v1';

const emits = defineEmits(['newTaskAdded']);

const addTaskInput = ref('');
const addBtnOff = ref(false);
const validatorMessage = ref('');

const addNewTask = async () => {
  const validation = validateTaskTitle(addTaskInput.value);
  if (validation) {
    validatorMessage.value = validation;
    return;
  }
  addBtnOff.value = true;
  await createTodo(addTaskInput.value);
  addTaskInput.value = '';
  emits('newTaskAdded');
  addBtnOff.value = false;
};

watch(addTaskInput, () => {
  validatorMessage.value = '';
});
</script>

<template>
  <div class="addTaskContainer">
    <TaskTitleInput
      v-model:add-task-input="addTaskInput"
      v-model:validator-message="validatorMessage"
      @add-task-title="addNewTask()"
    />
    <button class="btn addBtn" @click="addNewTask()" :disabled="addBtnOff">Add</button>
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
