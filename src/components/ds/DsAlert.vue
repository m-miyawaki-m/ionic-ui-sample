<template>
  <div class="ds-alert" :class="`ds-alert--${type}`" role="alert">
    <span class="material-symbols-outlined ds-alert__icon">{{ icon }}</span>
    <span class="ds-alert__msg"><slot>メッセージ</slot></span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(defineProps<{ type?: 'ng' | 'warning' | 'ok' }>(), { type: 'ok' });
const icon = computed(() => ({ ng: 'error', warning: 'warning', ok: 'check_circle' }[props.type]));
</script>

<style scoped>
.ds-alert {
  display: inline-flex; align-items: center; gap: var(--spacing-2);
  font-family: var(--font-family-base); font-size: var(--font-size-body);
  padding: var(--spacing-2) var(--spacing-3); border-radius: var(--radius-sm);
  border: 1px solid currentColor;
}
.ds-alert__icon { font-size: 20px; }
.ds-alert--ng { color: var(--alert-ng); }
.ds-alert--warning { color: var(--alert-warning); }
.ds-alert--ok { color: var(--alert-ok); }
</style>
