<template>
  <demo-layout title="FAB">
    <p>右下のフローティングボタンを確認してください。</p>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button><ion-icon :icon="add" /></ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button><ion-icon :icon="share" /></ion-fab-button>
        <ion-fab-button><ion-icon :icon="heart" /></ion-fab-button>
      </ion-fab-list>
    </ion-fab>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/vue';
import { add, share, heart } from 'ionicons/icons';
import DemoLayout from './DemoLayout.vue';
</script>
