<template>
  <a class="ds-link" :class="`ds-link--${variant}`" :href="href"><slot>リンク</slot></a>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'primary' | 'sub' | 'visited'; href?: string }>(), {
  variant: 'primary', href: '#',
});
</script>

<style scoped>
.ds-link { font-family: var(--font-family-base); font-size: var(--font-size-body); text-decoration: underline; cursor: pointer; }
.ds-link--primary { color: var(--link-primary); }
.ds-link--sub { color: var(--link-sub); }
.ds-link--visited { color: var(--link-visited); }
.ds-link:focus-visible { outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: 2px; }
</style>
