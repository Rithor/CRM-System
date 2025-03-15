<script setup lang="ts">
import { useAttrs } from 'vue';

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
const attrs = useAttrs();
const size = attrs.size as string;
const icon = attrs.icon as string;
const isPrimary = attrs.type === 'primary';
const isDanger = attrs.type === 'danger';

const emits = defineEmits(['click']);
</script>

<template>
  <button
    class="btn"
    :class="{ primary: isPrimary, danger: isDanger, md: size === 'md' }"
    @click="emits('click')"
    :disabled="loading"
  >
    <div v-if="icon && !loading" class="icon">
      <img class="iconImg" :src="icon" alt="" />
    </div>

    <div v-else-if="loading" class="spinner">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
    </div>

    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
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
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.md {
  width: 48px;
  height: 48px;
}

.primary {
  padding: 1rem 3rem;
}

.danger {
  background-color: var(--color-second);
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.iconImg {
  width: 1.25rem;
  height: 1.25rem;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 0.25rem;
  & svg {
    width: 20px;
    height: 20px;
    margin-left: 0.25rem;
    animation: spin 1s linear infinite;
  }
}

.spinner-path {
  opacity: 0.25;
}

.spinner-path-inner {
  opacity: 0.75;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
