<template>
  <demo-layout title="Input">
    <ion-list>
      <ion-item>
        <ion-input label="名前" label-placement="floating" placeholder="山田太郎" />
      </ion-item>
      <ion-item>
        <ion-input label="メール" type="email" label-placement="stacked" placeholder="a@example.com" />
      </ion-item>
      <ion-item>
        <ion-input label="パスワード" type="password" label-placement="floating" />
      </ion-item>
      <ion-item>
        <ion-input label="クリア可" :clear-input="true" value="編集してください" />
      </ion-item>
    </ion-list>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonInput } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
