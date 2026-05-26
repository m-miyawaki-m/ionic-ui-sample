<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>UIサンプル</ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/settings" aria-label="設定">
            <ion-icon slot="icon-only" :icon="settingsOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list :inset="true">
        <ion-item button router-link="/components" detail>
          <ion-icon slot="start" :icon="cubeOutline" />
          <ion-label>
            <h2>コンポーネント</h2>
            <p>{{ componentSamples.length }} 件のUI部品</p>
          </ion-label>
        </ion-item>
        <ion-item button router-link="/pages" detail>
          <ion-icon slot="start" :icon="documentsOutline" />
          <ion-label>
            <h2>ページサンプル</h2>
            <p>{{ pageSamples.length }} 件の画面雛形</p>
          </ion-label>
        </ion-item>
        <ion-item button router-link="/settings" detail>
          <ion-icon slot="start" :icon="settingsOutline" />
          <ion-label>
            <h2>設定</h2>
            <p>テーマ切替（ライト/ダーク/練習）</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon, IonButtons, IonButton,
} from '@ionic/vue';
import { settingsOutline, cubeOutline, documentsOutline } from 'ionicons/icons';
import { componentSamples, pageSamples } from '../data/catalog';
</script>
