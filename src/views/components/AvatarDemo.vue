<template>
  <demo-layout title="Avatar & Thumbnail">
    <ion-list>
      <ion-item>
        <ion-avatar slot="start"><img alt="avatar" src="https://i.pravatar.cc/80?img=1" /></ion-avatar>
        <ion-label>アバター付き項目</ion-label>
      </ion-item>
      <ion-item>
        <ion-thumbnail slot="start"><img alt="thumb" src="https://picsum.photos/120" /></ion-thumbnail>
        <ion-label>サムネイル付き項目</ion-label>
      </ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonAvatar, IonThumbnail } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
