<template>
  <nav class="ds-menu">
    <button v-for="item in items" :key="item.label"
            class="ds-menu__item" :class="{ 'is-selected': item.label === selected, 'is-disabled': item.disabled }"
            :disabled="item.disabled"
            @click="$emit('select', item.label)">
      <span class="material-symbols-outlined" v-if="item.icon">{{ item.icon }}</span>
      <span class="ds-menu__label">{{ item.label }}</span>
      <span v-if="item.badge" class="ds-menu__badge">{{ item.badge }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
export interface MenuItem { label: string; icon?: string; badge?: number; disabled?: boolean }
defineProps<{ items: MenuItem[]; selected?: string }>();
defineEmits<{ (e: 'select', v: string): void }>();
</script>

<style scoped>
.ds-menu { display: flex; flex-direction: column; width: 220px; background: var(--menu-color-1); font-family: var(--font-family-base); border-radius: var(--radius-md); overflow: hidden; }
.ds-menu__item {
  display: flex; align-items: center; gap: var(--spacing-2);
  padding: var(--spacing-3); border: none; background: transparent;
  color: var(--text-body); font-size: var(--font-size-body); cursor: pointer; text-align: left;
  border-bottom: 1px solid var(--menu-color-4);
}
.ds-menu__item:hover:not(.is-disabled) { background: var(--menu-color-2); }
.ds-menu__item.is-selected { background: var(--menu-color-3); }
.ds-menu__item.is-disabled { color: var(--menu-color-4); cursor: not-allowed; }
.ds-menu__label { flex: 1; }
.ds-menu__badge { background: var(--menu-badge); color: #fff; border-radius: 10px; padding: 0 var(--spacing-2); font-size: var(--font-size-caption); }
</style>
