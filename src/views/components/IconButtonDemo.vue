<template>
  <demo-layout title="IconButton">
    <div class="stack">
      <icon-button label="お気に入り" :icon="heart" color="primary" />
      <icon-button label="共有" :icon="share" icon-slot="end" fill="outline" />
      <icon-button label="削除" :icon="trash" color="danger" fill="clear" />
      <icon-button :icon="add" icon-slot="icon-only" color="success" />
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { heart, share, trash, add } from 'ionicons/icons';
import DemoLayout from './DemoLayout.vue';
import IconButton from '../../components/IconButton.vue';
</script>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
</style>
