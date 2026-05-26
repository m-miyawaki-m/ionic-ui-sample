<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/home" /></ion-buttons>
        <ion-title>設定</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list :inset="true">
        <ion-radio-group :value="theme" @ionChange="onChange">
          <ion-item v-for="t in themeOptions" :key="t.value">
            <ion-radio :value="t.value">{{ t.label }}</ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-list>
      <p class="hint">現在のテーマ: <strong>{{ theme }}</strong></p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonRadioGroup, IonRadio, IonButtons, IonBackButton,
  type RadioGroupCustomEvent,
} from '@ionic/vue';
import { useTheme, type ThemeName } from '../composables/useTheme';

const { theme, setTheme } = useTheme();

const themeOptions: { value: ThemeName; label: string }[] = [
  { value: 'light', label: 'ライト' },
  { value: 'dark', label: 'ダーク' },
  { value: 'practice', label: '練習' },
];

function onChange(ev: RadioGroupCustomEvent) {
  setTheme(ev.detail.value as ThemeName);
}
</script>

<style scoped>
.hint { color: var(--app-text-muted); margin-top: 16px; }
</style>
