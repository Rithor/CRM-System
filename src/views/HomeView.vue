<script setup lang="ts">
import { deleteTodo, getTodos, updateTodo } from '@/api/todoAPI_v1';
import AddTask from '@/components/AddTask.vue';
import TaskInfo from '@/components/TaskInfo.vue';
import TasksList from '@/components/TasksList.vue';
import type { ITodoInfo, ITodoItem } from '@/types/todo.interface';
import { onMounted, ref, watch, type Ref } from 'vue';

const allTasks = ref<ITodoItem[]>();
const allTasksInfo = ref<ITodoInfo>();
const activeCategory = ref('All');

const fetchTasks = async () => {
  const data = await getTodos(activeCategory.value);
  allTasksInfo.value = data.info as ITodoInfo;
  allTasks.value = data.data as ITodoItem[];
};

const handleDeleteTask = async (id: number) => {
  await deleteTodo(id);
  fetchTasks();
};

const handleUpdateTaskStatus = async (taskItem: ITodoItem) => {
  const updatedTask = {
    isDone: !taskItem.isDone,
    title: taskItem.title,
  };
  await updateTodo(updatedTask, taskItem.id);
  fetchTasks();
};

const handleEditTask = async (taskItem: ITodoItem, newTaskTitle: Ref) => {
  const updatedTask = {
    isDone: taskItem.isDone,
    title: newTaskTitle.value,
  };
  await updateTodo(updatedTask, taskItem.id);
  fetchTasks();
};

watch(activeCategory, async () => {
  await fetchTasks();
});

onMounted(async () => {
  await fetchTasks();
});
</script>

<template>
  <main>
    <section class="wrapper">
      <div class="sticky-elements">
        <AddTask @new-task-added="fetchTasks" />

        <TaskInfo
          :active-category
          :task-info="allTasksInfo"
          @show-all="activeCategory = 'All'"
          @show-in-work="activeCategory = 'inWork'"
          @show-completed="activeCategory = 'completed'"
        />
      </div>

      <TasksList
        :allTasks
        @delete-task="handleDeleteTask"
        @update-task-status="handleUpdateTaskStatus"
        @edit-task="handleEditTask"
      />
    </section>
  </main>
</template>

<style scoped>
.wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.sticky-elements {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: var(--color-background-soft);
}
</style>
