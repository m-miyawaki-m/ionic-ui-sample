<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/pages" /></ion-buttons>
        <ion-title>プロフィール</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-avatar slot="start"><img alt="avatar" src="https://i.pravatar.cc/80?img=5" /></ion-avatar>
          <ion-label><h2>山田太郎</h2><p>taro@example.com</p></ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/vue';
</script>
