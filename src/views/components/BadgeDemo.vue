<template>
  <demo-layout title="Badge & Chip">
    <ion-list>
      <ion-item><ion-label>受信箱</ion-label><ion-badge slot="end" color="primary">12</ion-badge></ion-item>
      <ion-item><ion-label>警告</ion-label><ion-badge slot="end" color="warning">3</ion-badge></ion-item>
    </ion-list>
    <div class="chips">
      <ion-chip>標準</ion-chip>
      <ion-chip color="primary">Primary</ion-chip>
      <ion-chip color="success"><ion-icon :icon="checkmarkCircle" /><ion-label>完了</ion-label></ion-chip>
      <ion-chip :outline="true">アウトライン</ion-chip>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonBadge, IonChip, IonIcon } from '@ionic/vue';
import { checkmarkCircle } from 'ionicons/icons';
import DemoLayout from './DemoLayout.vue';
</script>

<style scoped>
.chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
</style>
