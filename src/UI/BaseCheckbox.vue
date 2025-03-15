<script setup lang="ts">
defineProps({ isDone: Boolean });

const emits = defineEmits(['taskStatusUpdated']);
</script>

<template>
  <label class="custom-checkbox" @click="emits('taskStatusUpdated')">
    <input type="checkbox" :checked="isDone" />
    <span class="checkmark">
      <img
        v-if="isDone"
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
    </span>
  </label>
</template>

<style scoped>
.custom-checkbox {
  position: relative;
  padding-left: 35px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
}

.custom-checkbox input {
  position: absolute;
  top: -6px;
  left: 11px;
}

.checkmark {
  position: absolute;
  top: -12px;
  left: 5px;
}

.checkboxIcon {
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--color-background);
}
</style>
