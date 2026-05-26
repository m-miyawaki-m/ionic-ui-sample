<template>
  <demo-layout title="List & Item">
    <ion-list>
      <ion-item v-for="n in 4" :key="n" button detail>
        <ion-icon slot="start" :icon="folderOutline" />
        <ion-label>
          <h2>項目 {{ n }}</h2>
          <p>区切り線と文字色がテーマ追従します</p>
        </ion-label>
      </ion-item>
    </ion-list>
    <ion-list :inset="true">
      <ion-item-divider>区切り見出し</ion-item-divider>
      <ion-item><ion-label>インセットリスト</ion-label></ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonIcon, IonItemDivider } from '@ionic/vue';
import { folderOutline } from 'ionicons/icons';
import DemoLayout from './DemoLayout.vue';
</script>
