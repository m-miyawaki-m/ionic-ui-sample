<template>
  <demo-layout title="Indicators">
    <h3>Spinner</h3>
    <div class="row">
      <ion-spinner name="lines" />
      <ion-spinner name="crescent" />
      <ion-spinner name="dots" />
      <ion-spinner name="circular" />
    </div>
    <h3>Progress</h3>
    <ion-progress-bar :value="0.5" />
    <ion-progress-bar type="indeterminate" />
    <div class="stack">
      <ion-button @click="showLoading">Loading を表示</ion-button>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonSpinner, IonProgressBar, IonButton, loadingController } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';

async function showLoading() {
  const loading = await loadingController.create({ message: '読み込み中…', duration: 1500 });
  await loading.present();
}
</script>

<style scoped>
.row { display: flex; gap: 24px; font-size: 28px; margin-bottom: 12px; }
.stack { margin-top: 16px; }
</style>
