<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['click']);
</script>

<template>
  <button @click="emits('click')" :disabled="loading" class="btn">
    <Transition>
      <svg v-if="loading" class="spinner" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle
          class="spinner-path"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="spinner-path-inner"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        ></path>
      </svg>
    </Transition>

    <span class="slotStyle" :class="{ invisible: loading }">
      <slot></slot>
    </span>
  </button>
</template>

<style scoped>
.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  position: absolute;
}

.spinner-path {
  opacity: 0.25;
}

.spinner-path-inner {
  opacity: 0.75;
}

.invisible {
  visibility: hidden;
}

.slotStyle {
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
