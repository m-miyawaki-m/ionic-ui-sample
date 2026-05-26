<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/pages/list" /></ion-buttons>
        <ion-title>{{ record?.title ?? '詳細' }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <template v-if="record">
        <h2>{{ record.title }}</h2>
        <p class="sub">{{ record.subtitle }}</p>
        <p>{{ record.body }}</p>
      </template>
      <p v-else>レコードが見つかりません。</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
} from '@ionic/vue';
import { findRecord } from './listData';

const route = useRoute();
const record = computed(() => findRecord(String(route.params.id)));
</script>

<style scoped>
.sub { color: var(--app-text-muted); }
</style>
