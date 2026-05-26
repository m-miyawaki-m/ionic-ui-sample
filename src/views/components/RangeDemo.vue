<template>
  <demo-layout title="Range">
    <ion-list>
      <ion-item>
        <ion-range :value="40" aria-label="音量"><ion-icon slot="start" :icon="volumeLow" /><ion-icon slot="end" :icon="volumeHigh" /></ion-range>
      </ion-item>
      <ion-item>
        <ion-range :dual-knobs="true" :value="{ lower: 20, upper: 80 }" aria-label="範囲" :pin="true" />
      </ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonRange, IonIcon } from '@ionic/vue';
import { volumeLow, volumeHigh } from 'ionicons/icons';
import DemoLayout from './DemoLayout.vue';
</script>
