<template>
  <demo-layout title="Toggle">
    <ion-list>
      <ion-item><ion-toggle :checked="true">通知</ion-toggle></ion-item>
      <ion-item><ion-toggle color="success">ダークモード</ion-toggle></ion-item>
      <ion-item><ion-toggle :disabled="true">無効</ion-toggle></ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonToggle } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
