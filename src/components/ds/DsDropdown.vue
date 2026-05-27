<template>
  <ul class="ds-dropdown" role="listbox">
    <li v-for="opt in options" :key="opt"
        class="ds-dropdown__item" :class="{ 'is-selected': opt === modelValue }"
        role="option" :aria-selected="opt === modelValue"
        @click="$emit('update:modelValue', opt)">
      {{ opt }}
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ options: string[]; modelValue?: string }>();
defineEmits<{ (e: 'update:modelValue', v: string): void }>();
</script>

<style scoped>
.ds-dropdown {
  list-style: none; margin: 0; padding: var(--spacing-1);
  background: var(--dropdown-bg);
  border: 1px solid var(--table-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  font-family: var(--font-family-base); font-size: var(--font-size-body);
  color: var(--text-body); width: 220px;
}
.ds-dropdown__item { padding: var(--spacing-2) var(--spacing-3); border-radius: var(--radius-sm); cursor: pointer; }
.ds-dropdown__item:hover { background: var(--menu-color-2); }
.ds-dropdown__item.is-selected { background: var(--dropdown-bg-selected); }
</style>
