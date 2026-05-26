<template>
  <demo-layout title="Overlays">
    <div class="stack">
      <ion-button @click="isModalOpen = true">Modal を開く</ion-button>
      <ion-button @click="presentAlert">Alert</ion-button>
      <ion-button @click="presentActionSheet">Action Sheet</ion-button>
      <ion-button @click="presentToast">Toast</ion-button>
    </div>

    <ion-modal :is-open="isModalOpen" @did-dismiss="isModalOpen = false">
      <ion-header>
        <ion-toolbar>
          <ion-title>モーダル</ion-title>
          <ion-buttons slot="end"><ion-button @click="isModalOpen = false">閉じる</ion-button></ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">モーダルの内容です。</ion-content>
    </ion-modal>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  alertController, actionSheetController, toastController,
} from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';

const isModalOpen = ref(false);

async function presentAlert() {
  const alert = await alertController.create({
    header: '確認', message: '実行しますか？',
    buttons: ['キャンセル', 'OK'],
  });
  await alert.present();
}

async function presentActionSheet() {
  const sheet = await actionSheetController.create({
    header: '操作を選択',
    buttons: [
      { text: '削除', role: 'destructive' },
      { text: '共有' },
      { text: 'キャンセル', role: 'cancel' },
    ],
  });
  await sheet.present();
}

async function presentToast() {
  const toast = await toastController.create({ message: '保存しました', duration: 1500, position: 'bottom' });
  await toast.present();
}
</script>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 12px; }
</style>
