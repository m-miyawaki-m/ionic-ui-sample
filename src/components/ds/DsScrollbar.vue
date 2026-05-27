<template>
  <div class="ds-scrollarea">
    <div class="ds-scrollarea__content"><slot /></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.ds-scrollarea {
  height: 200px; width: 280px; overflow: auto;
  border: 1px solid var(--table-border); border-radius: var(--radius-md);
  background: var(--bg-base); color: var(--text-body);
  font-family: var(--font-family-base); padding: var(--spacing-3);
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}
.ds-scrollarea::-webkit-scrollbar { width: 12px; height: 12px; }
.ds-scrollarea::-webkit-scrollbar-track { background: var(--scrollbar-track); }
.ds-scrollarea::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 6px; }
.ds-scrollarea::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-thumb-hover); }
.ds-scrollarea__content { width: 480px; }
</style>
