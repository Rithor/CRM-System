<script setup lang="ts">
import { watch } from 'vue';
import { validateTaskTitle } from '@/utils/validation';

defineProps({ isEdit: Boolean });

const emits = defineEmits(['addTaskTitle']);

const validatorMessage = defineModel('validatorMessage', { type: String, default: '' });
const formInput = defineModel('formInput', { type: String, default: '' });

const handleSubmit = () => {
  const notValidMsg = validateTaskTitle(formInput.value);
  if (notValidMsg) {
    validatorMessage.value = notValidMsg;
    return;
  }
  emits('addTaskTitle', formInput.value);
};

watch(formInput, () => {
  validatorMessage.value = '';
});
</script>

<template>
  <div class="formWrapper">
    <transition name="fade">
      <span v-if="!!validatorMessage" class="validatorMessage">{{ validatorMessage }}</span>
    </transition>
    <form class="form" action="" v-on:submit.prevent="handleSubmit">
      <input
        id="taskInput"
        :class="isEdit ? 'editionInput' : 'input'"
        type="text"
        placeholder="Task To Be Done..."
        v-model="formInput"
      />
      <slot></slot>
    </form>
  </div>
</template>

<style scoped>
.formWrapper {
  position: relative;
  flex: 1;
  & input {
    width: 100%;
    font-size: 1rem;
  }
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.input {
  border: none;
  border-radius: var(--border-radius);
  outline: none;
  background-color: var(--color-background-soft);
  border-bottom: solid 1px var(--color-border);
  padding: 1rem 1rem;

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

.editionInput {
  flex: 1;
  padding: 0 0.5rem;
  line-height: 250%;
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
