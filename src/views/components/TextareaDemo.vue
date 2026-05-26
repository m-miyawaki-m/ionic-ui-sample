<template>
  <demo-layout title="Textarea">
    <ion-list>
      <ion-item>
        <ion-textarea label="コメント" label-placement="floating" :rows="4" placeholder="自由記述" />
      </ion-item>
      <ion-item>
        <ion-textarea label="自動拡張" :auto-grow="true" label-placement="stacked" />
      </ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonTextarea } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
