<template>
  <demo-layout title="Calendar">
    <div class="stack">
      <ion-datetime presentation="date" />
      <ion-datetime presentation="date-time" />
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonDatetime } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>

<style scoped>
.stack { display: flex; flex-wrap: wrap; gap: 24px; }
</style>
