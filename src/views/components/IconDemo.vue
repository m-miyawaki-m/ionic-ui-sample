<template>
  <demo-layout title="Icon">
    <div class="grid">
      <ion-icon :icon="heart" />
      <ion-icon :icon="star" color="warning" />
      <ion-icon :icon="home" color="primary" />
      <ion-icon :icon="settings" />
      <ion-icon :icon="trash" color="danger" />
      <ion-icon :icon="checkmarkCircle" color="success" />
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { heart, star, home, settings, trash, checkmarkCircle } from 'ionicons/icons';
import DemoLayout from './DemoLayout.vue';
</script>

<style scoped>
.grid { display: flex; gap: 20px; font-size: 32px; flex-wrap: wrap; }
</style>
