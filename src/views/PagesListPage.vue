<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/home" /></ion-buttons>
        <ion-title>ページサンプル</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="s in pageSamples" :key="s.id" button :router-link="s.route" detail>
          <ion-label>
            <h2>{{ s.title }}</h2>
            <p>{{ s.description }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButtons, IonBackButton,
} from '@ionic/vue';
import { pageSamples } from '../data/catalog';
</script>
