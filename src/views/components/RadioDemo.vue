<template>
  <demo-layout title="Radio">
    <ion-list>
      <ion-radio-group value="b">
        <ion-item><ion-radio value="a">選択肢 A</ion-radio></ion-item>
        <ion-item><ion-radio value="b">選択肢 B</ion-radio></ion-item>
        <ion-item><ion-radio value="c">選択肢 C</ion-radio></ion-item>
      </ion-radio-group>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonRadioGroup, IonRadio } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
