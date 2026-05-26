<template>
  <demo-layout title="Button">
    <div class="stack">
      <ion-button>Default</ion-button>
      <ion-button color="primary">Primary</ion-button>
      <ion-button color="success">Success</ion-button>
      <ion-button color="warning">Warning</ion-button>
      <ion-button color="danger">Danger</ion-button>
      <ion-button fill="outline">Outline</ion-button>
      <ion-button fill="clear">Clear</ion-button>
      <ion-button :disabled="true">Disabled</ion-button>
      <ion-button expand="block">Block</ion-button>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
.stack ion-button { width: 100%; }
</style>
