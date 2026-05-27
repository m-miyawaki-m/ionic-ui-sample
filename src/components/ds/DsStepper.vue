<template>
  <ol class="ds-stepper">
    <li v-for="(step, i) in steps" :key="i" class="ds-stepper__step" :class="`is-${step.state}`">
      <span class="ds-stepper__dot">{{ i + 1 }}</span>
      <span class="ds-stepper__label">{{ step.label }}</span>
    </li>
  </ol>
</template>

<script setup lang="ts">
export type StepState = 'done' | 'current' | 'todo' | 'error';
defineProps<{ steps: { label: string; state: StepState }[] }>();
</script>

<style scoped>
.ds-stepper { list-style: none; display: flex; gap: var(--spacing-4); margin: 0; padding: 0; font-family: var(--font-family-base); }
.ds-stepper__step { display: flex; align-items: center; gap: var(--spacing-2); color: var(--text-body); font-size: var(--font-size-body); }
.ds-stepper__dot {
  width: 28px; height: 28px; border-radius: 50%;
  display: grid; place-items: center; color: #fff; font-size: 14px;
}
.is-done .ds-stepper__dot { background: var(--stepper-color-1); }
.is-current .ds-stepper__dot { background: var(--stepper-color-2); }
.is-todo .ds-stepper__dot { background: var(--stepper-color-3); color: var(--text-body); }
.is-error .ds-stepper__dot { background: var(--stepper-color-4); }
</style>
