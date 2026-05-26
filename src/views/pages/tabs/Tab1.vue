<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/pages" /></ion-buttons>
        <ion-title>ホーム</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding"><p>ホームタブの内容です。</p></ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
</script>
