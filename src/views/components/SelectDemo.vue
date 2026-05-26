<template>
  <demo-layout title="Select">
    <ion-list>
      <ion-item>
        <ion-select label="果物" placeholder="選択">
          <ion-select-option value="apple">りんご</ion-select-option>
          <ion-select-option value="orange">みかん</ion-select-option>
          <ion-select-option value="grape">ぶどう</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-select label="複数選択" :multiple="true" placeholder="選択">
          <ion-select-option value="a">A</ion-select-option>
          <ion-select-option value="b">B</ion-select-option>
          <ion-select-option value="c">C</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
