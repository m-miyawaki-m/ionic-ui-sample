<template>
  <div class="ds-dialog-overlay">
    <div class="ds-dialog" role="dialog">
      <h2 class="ds-dialog__title">{{ title }}</h2>
      <ul class="ds-dialog__list">
        <li v-for="item in items" :key="item"
            class="ds-dialog__item" :class="{ 'is-selected': item === selected }"
            @click="$emit('select', item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; items: string[]; selected?: string }>();
defineEmits<{ (e: 'select', v: string): void }>();
</script>

<style scoped>
.ds-dialog-overlay {
  position: relative; display: grid; place-items: center;
  min-height: 320px; padding: 24px;
  background: var(--dialog-overlay);
}
.ds-dialog {
  background: var(--bg-base); color: var(--text-body);
  font-family: var(--font-family-base);
  border-radius: var(--radius-md); box-shadow: var(--shadow-md);
  padding: var(--spacing-4); width: 320px;
}
.ds-dialog__title { font-size: var(--font-size-heading); color: var(--text-heading); margin: 0 0 var(--spacing-3); }
.ds-dialog__list { list-style: none; margin: 0; padding: 0; }
.ds-dialog__item { padding: var(--spacing-2) var(--spacing-3); border-radius: var(--radius-sm); cursor: pointer; background: var(--dialog-list-item-bg-unselected); margin-bottom: var(--spacing-1); }
.ds-dialog__item.is-selected { background: var(--dialog-list-item-bg-selected); }
</style>
