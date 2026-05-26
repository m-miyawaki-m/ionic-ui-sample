<template>
  <demo-layout title="Accordion">
    <ion-accordion-group>
      <ion-accordion value="first">
        <ion-item slot="header"><ion-label>セクション1</ion-label></ion-item>
        <div class="ion-padding" slot="content">セクション1の内容。</div>
      </ion-accordion>
      <ion-accordion value="second">
        <ion-item slot="header"><ion-label>セクション2</ion-label></ion-item>
        <div class="ion-padding" slot="content">セクション2の内容。</div>
      </ion-accordion>
    </ion-accordion-group>
  </demo-layout>
</template>

<script setup lang="ts">
import { IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
