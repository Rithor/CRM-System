<script setup lang="ts">
import type { ITodoItem } from '@/types/todo.interface';
import { validateTaskTitle } from '@/utils/validation';
import { ref, watch } from 'vue';
import TaskTitleInput from './TaskTitleInput.vue';

type TaskProps = {
  taskItem: ITodoItem;
};
const props = defineProps<TaskProps>();
const emits = defineEmits(['deleteTask', 'updateTaskStatus', 'editTask']);

const isEditTask = ref(false);
const addTaskInput = ref(props.taskItem.title);
const validatorMessage = ref('');

const editTask = () => {
  const validation = validateTaskTitle(addTaskInput.value);
  if (validation) {
    validatorMessage.value = validation;
    return;
  }
  isEditTask.value = false;
  if (addTaskInput.value !== props.taskItem.title) {
    emits('editTask', addTaskInput);
  }
};
const handleCancel = () => {
  isEditTask.value = false;
  addTaskInput.value = props.taskItem.title;
};

watch(addTaskInput, () => {
  validatorMessage.value = '';
});
</script>

<template>
  <div class="taskItem">
    <div class="checkboxIconWrapper" @click="emits('updateTaskStatus', props.taskItem)">
      <img
        v-if="props.taskItem.isDone"
        class="checkboxIcon"
        src="../assets/icons/checkbox-check.svg"
        alt="icon of a checked checkbox"
      />
      <img
        v-else
        class="checkboxIcon"
        src="../assets/icons/checkbox-blank.svg"
        alt="unchecked checkbox icon"
      />
    </div>

    <div v-if="!isEditTask" class="taskItemShow">
      <p class="taskItemTitle">{{ addTaskInput }}</p>
      <button class="btn taskBtn" @click="isEditTask = true">
        <img class="taskBtnIcon" src="../assets/icons/edit-5208207.svg" alt="edit button" />
      </button>
      <button
        class="btn taskBtn taskBtn-delete"
        @click.once="emits('deleteTask', props.taskItem.id)"
      >
        <img class="taskBtnIcon" src="../assets/icons/trash-can-1539321.svg" alt="delete button" />
      </button>
    </div>

    <div v-else class="taskItemShow taskItemShowEdition">
      <TaskTitleInput
        :isEdit="true"
        v-model:add-task-input="addTaskInput"
        v-model:validator-message="validatorMessage"
      />
      <button class="btn taskBtn" @click="editTask">
        <img class="taskBtnIcon" src="../assets/icons/check-yes.svg" alt="edit button" />
      </button>
      <button class="btn taskBtn taskBtn-delete" @click.once="handleCancel">
        <img class="taskBtnIcon" src="../assets/icons/cross.svg" alt="delete button" />
      </button>
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

.checkboxIconWrapper {
  display: flex;
  cursor: pointer;
}

.checkboxIcon {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.2s;

  &:hover {
    filter: drop-shadow(2px 2px 2px var(--color-border-hover));
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.9);
  }
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
