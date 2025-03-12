<script setup lang="ts">
defineProps({ isEdit: Boolean });

const emits = defineEmits(['addTaskTitle']);

const validatorMessage = defineModel('validatorMessage');
const taskTitleInput = defineModel('taskTitleInput');
</script>

<template>
  <div class="taskTitleInputWrapper">
    <transition name="fade">
      <span v-if="!!validatorMessage" class="validatorMessage">{{ validatorMessage }}</span>
    </transition>
    <input
      id=" addTask"
      :class="isEdit ? 'taskEditionInput' : 'taskTitleInput'"
      type="text"
      placeholder="Task To Be Done..."
      v-model.trim="taskTitleInput"
      @keyup.enter="emits('addTaskTitle', taskTitleInput)"
    />
  </div>
</template>

<style scoped>
.taskTitleInputWrapper {
  position: relative;
  flex: 1;
}

.taskTitleInput {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: var(--border-radius);
  outline: none;
  background-color: var(--color-background-soft);
  border-bottom: solid 1px var(--color-border);
  padding: 0 1rem;
  line-height: 200%;
  font-size: 1rem;

  &:focus {
    outline: 1px solid var(--color-border-hover);
  }
}

.validatorMessage {
  display: block;
  position: absolute;
  left: 5px;
  bottom: -20px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 0 5px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-second);
}

.taskEditionInput {
  flex: 1;
  width: 100%;
  padding: 13px;
  font-size: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
