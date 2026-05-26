<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/pages/tabs/tab1">
          <ion-icon :icon="homeOutline" /><ion-label>ホーム</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab2" href="/pages/tabs/tab2">
          <ion-icon :icon="searchOutline" /><ion-label>検索</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/pages/tabs/tab3">
          <ion-icon :icon="personOutline" /><ion-label>プロフィール</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel,
} from '@ionic/vue';
import { homeOutline, searchOutline, personOutline } from 'ionicons/icons';
</script>
