<template>
  <demo-layout title="Segment">
    <ion-segment value="all">
      <ion-segment-button value="all"><ion-label>すべて</ion-label></ion-segment-button>
      <ion-segment-button value="fav"><ion-label>お気に入り</ion-label></ion-segment-button>
      <ion-segment-button value="archive"><ion-label>アーカイブ</ion-label></ion-segment-button>
    </ion-segment>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
