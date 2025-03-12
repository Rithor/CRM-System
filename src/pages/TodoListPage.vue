<script setup lang="ts">
import { getTodos } from '@/api/todoAPI_v1';
import AddTask from '@/components/AddTask.vue';
import TaskInfo from '@/components/TaskInfo.vue';
import TasksList from '@/components/TasksList.vue';
import { TodoFilter, type ITodoInfo, type ITodoItem } from '@/types/todo.interface';
import { onMounted, ref, watch } from 'vue';

const allTasks = ref<ITodoItem[]>();
const allTasksInfo = ref<ITodoInfo>();
const activeCategory = ref(TodoFilter.ALL);

const fetchTasks = async () => {
  try {
    const data = await getTodos(activeCategory.value);
    allTasksInfo.value = data.info;
    allTasks.value = data.data;
  } catch (error) {
    console.error(error);
  }
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
          @show-all="activeCategory = TodoFilter.ALL"
          @show-in-work="activeCategory = TodoFilter.IN_WORK"
          @show-completed="activeCategory = TodoFilter.COMPLETED"
        />
      </div>

      <TasksList :allTasks @task-updated="fetchTasks" />
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

<style>
.container {
  position: relative;
  padding: 1rem;
}

.btn {
  font-size: 1rem;
  background-color: var(--color-primary);
  color: var(--vt-c-white);
  border-radius: var(--border-radius);
  border: none;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    filter: brightness(0.9);
    box-shadow: 2px 2px 5px var(--color-border-hover);
  }

  &:active {
    transform: scale(0.9);
  }
}
</style>
