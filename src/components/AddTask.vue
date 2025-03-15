<script setup lang="ts">
import { ref } from 'vue';
import { createTodo } from '@/api/todos';
import TaskForm from './TaskForm.vue';
import BaseButton from '@/UI/BaseButton.vue';

const emits = defineEmits(['newTaskAdded']);

const addTaskInput = ref('');
const isLoading = ref(false);

const addNewTask = async () => {
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
</script>

<template>
  <div class="addTaskContainer">
    <TaskForm v-model:form-input="addTaskInput" @add-task-title="addNewTask">
      <BaseButton type="primary" :loading="isLoading">Add</BaseButton>
    </TaskForm>
  </div>
</template>

<style scoped>
.addTaskContainer {
  padding-top: 1rem;
  margin-bottom: 1rem;
}
</style>
