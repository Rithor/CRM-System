<script setup lang="ts">
defineProps({ isDone: Boolean });

const emits = defineEmits(['taskStatusUpdated']);
</script>

<template>
  <div class="checkboxIconWrapper" @click="emits('taskStatusUpdated')">
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
  </div>
</template>

<style scoped>
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
</style>
