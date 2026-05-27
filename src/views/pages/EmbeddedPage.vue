<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/pages" /></ion-buttons>
        <ion-title>埋め込み（サイズ制限）</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p class="note">
        ion-page / ion-content の全画面 chrome を使わず、サイズ固定の枠（<code>.embed-frame</code>）に
        部品を収めた例です。Android アプリの一部品として埋め込む想定。スクロールも枠内で完結します。
      </p>

      <h3>固定サイズの widget（320×360）</h3>
      <div class="embed-frame" style="width: 320px; height: 360px;">
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>埋め込み例</ion-card-subtitle>
            <ion-card-title>ミニ widget</ion-card-title>
          </ion-card-header>
          <ion-card-content>枠内に収まるカード。テーマトークンに追従します。</ion-card-content>
        </ion-card>
        <ion-list>
          <ion-item><ion-input label="名前" label-placement="floating" placeholder="山田太郎" /></ion-item>
          <ion-item><ion-toggle :checked="true">通知</ion-toggle></ion-item>
        </ion-list>
        <ion-button expand="block" class="btn-primary1">送信</ion-button>
      </div>

      <h3 class="mt">スクロールが枠内で完結（240×200）</h3>
      <div class="embed-frame" style="width: 240px; height: 200px;">
        <ion-list>
          <ion-item v-for="n in 12" :key="n"><ion-label>項目 {{ n }}</ion-label></ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonList, IonItem, IonInput, IonToggle, IonButton, IonLabel,
} from '@ionic/vue';
</script>

<style scoped>
.note { color: var(--app-text-muted); font-size: 14px; line-height: 1.6; }
h3 { color: var(--app-text); font-size: 16px; }
.mt { margin-top: 24px; }
</style>
