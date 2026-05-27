<template>
  <button class="ds-btn" :class="`ds-btn--${variant}`" :disabled="disabled" type="button">
    <span v-if="icon" class="material-symbols-outlined ds-btn__icon">{{ icon }}</span>
    <slot>ボタン</slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary1' | 'primary2' | 'secondary';
  disabled?: boolean;
  icon?: string;
}>(), { variant: 'primary1', disabled: false });
</script>

<style scoped>
.ds-btn {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-2) var(--spacing-4);
  cursor: pointer;
  transition: background var(--transition-base), color var(--transition-base);
  display: inline-flex;
  align-items: center;
  gap: var(--btn-secondary-icon-gap);
}
.ds-btn:disabled { cursor: not-allowed; }
.ds-btn:focus-visible { outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: 2px; }
.ds-btn__icon { font-size: 18px; }
.ds-btn--primary1 { background: var(--btn-primary1-bg-active); color: var(--btn-primary1-text-active); }
.ds-btn--primary1:disabled { background: var(--btn-primary1-bg-disabled); color: var(--btn-primary1-text-disabled); }
.ds-btn--primary2 { background: var(--btn-primary2-bg-active); color: var(--btn-primary2-text-active); }
.ds-btn--primary2:disabled { background: var(--btn-primary2-bg-disabled); color: var(--btn-primary2-text-disabled); }
.ds-btn--secondary {
  background: var(--btn-secondary-bg-active);
  color: var(--btn-secondary-text-active);
  border: var(--btn-secondary-border-width) solid var(--btn-secondary-border-active);
}
.ds-btn--secondary:disabled {
  background: var(--btn-secondary-bg-disabled);
  color: var(--btn-secondary-text-disabled);
  border-color: var(--btn-secondary-border-disabled);
}
</style>
