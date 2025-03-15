<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getTodos } from '@/api/todos';
import { TodoFilter, type TodoInfo, type Todo } from '@/types/todos';
import AddTask from '@/components/AddTask.vue';
import TaskInfo from '@/components/TaskInfo.vue';
import TasksList from '@/components/TasksList.vue';

const defaultTasksInfo: TodoInfo = {
  all: 0,
  completed: 0,
  inWork: 0,
};

const tasks = ref<Todo[]>([]);
const tasksInfo = ref<TodoInfo>(defaultTasksInfo);
const activeCategory = ref(TodoFilter.ALL);

const fetchTasks = async () => {
  try {
    const data = await getTodos(activeCategory.value);
    tasksInfo.value = data.info ?? defaultTasksInfo;
    tasks.value = data.data;
  } catch (error) {
    console.error(error);
  }
};

const handleFilterChanged = async (filter: TodoFilter) => {
  activeCategory.value = filter;
  await fetchTasks(); // вопрос: надо-ли тут ставить await? и когда оборачивать await в try / catch
};

onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <main>
    <section class="wrapper">
      <div class="sticky-elements">
        <AddTask @new-task-added="fetchTasks" />

        <TaskInfo
          :active-category="activeCategory"
          :task-info="tasksInfo"
          @filter-changed="handleFilterChanged"
        />
      </div>

      <TasksList :tasks="tasks" @task-updated="fetchTasks" />
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
</style>
