<template>
  <table class="ds-table">
    <thead>
      <tr><th v-for="h in headers" :key="h">{{ h }}</th></tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows" :key="i">
        <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps<{ headers: string[]; rows: (string | number)[][] }>();
</script>

<style scoped>
.ds-table {
  border-collapse: collapse;
  width: 100%;
  font-family: var(--font-family-base);
  font-size: var(--font-size-body);
  color: var(--text-body);
}
.ds-table th, .ds-table td {
  border: var(--table-border-width) solid var(--table-border);
  padding: var(--spacing-2) var(--spacing-3);
  text-align: left;
}
.ds-table th { background: var(--table-header-bg); color: var(--text-heading); font-weight: 700; }
.ds-table tbody tr:nth-child(odd) td { background: var(--table-cell-bg-1); }
.ds-table tbody tr:nth-child(even) td { background: var(--table-cell-bg-2); }
</style>
