<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/pages" /></ion-buttons>
        <ion-title>{{ mode === 'login' ? 'ログイン' : 'サインアップ' }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-segment v-model="mode">
        <ion-segment-button value="login"><ion-label>ログイン</ion-label></ion-segment-button>
        <ion-segment-button value="signup"><ion-label>サインアップ</ion-label></ion-segment-button>
      </ion-segment>

      <ion-list class="ion-margin-top">
        <ion-item>
          <ion-input v-model="email" label="メール" type="email" label-placement="floating" />
        </ion-item>
        <ion-item>
          <ion-input v-model="password" label="パスワード" type="password" label-placement="floating" />
        </ion-item>
        <ion-item v-if="mode === 'signup'">
          <ion-input v-model="confirm" label="パスワード（確認）" type="password" label-placement="floating" />
        </ion-item>
      </ion-list>

      <ion-button expand="block" class="ion-margin-top" @click="submit">
        {{ mode === 'login' ? 'ログイン' : '登録' }}
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonInput, IonButton,
  toastController,
} from '@ionic/vue';

const mode = ref<'login' | 'signup'>('login');
const email = ref('');
const password = ref('');
const confirm = ref('');

async function submit() {
  // UI雛形のため認証は行わずトーストのみ
  const toast = await toastController.create({
    message: mode.value === 'login' ? 'ログイン送信（ダミー）' : '登録送信（ダミー）',
    duration: 1500,
  });
  await toast.present();
}
</script>
