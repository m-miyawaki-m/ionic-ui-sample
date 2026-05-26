<template>
  <demo-layout title="Card">
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>サブタイトル</ion-card-subtitle>
        <ion-card-title>カードタイトル</ion-card-title>
      </ion-card-header>
      <ion-card-content>カードの本文テキストです。背景・文字色はテーマに追従します。</ion-card-content>
    </ion-card>
    <ion-card color="primary">
      <ion-card-header><ion-card-title>主色カード</ion-card-title></ion-card-header>
      <ion-card-content>color="primary" を指定した例。</ion-card-content>
    </ion-card>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
