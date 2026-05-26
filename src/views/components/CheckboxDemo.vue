<template>
  <demo-layout title="Checkbox">
    <ion-list>
      <ion-item><ion-checkbox :checked="true">同意する</ion-checkbox></ion-item>
      <ion-item><ion-checkbox>ニュースを受け取る</ion-checkbox></ion-item>
      <ion-item><ion-checkbox :disabled="true">無効</ion-checkbox></ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonCheckbox } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
