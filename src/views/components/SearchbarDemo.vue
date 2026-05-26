<template>
  <demo-layout title="Searchbar">
    <ion-searchbar placeholder="検索" />
    <ion-searchbar :animated="true" placeholder="アニメーション" show-clear-button="focus" />
    <ion-searchbar value="入力済みの例" placeholder="検索" />
  </demo-layout>
</template>

<script setup lang="ts">
import { IonSearchbar } from '@ionic/vue';
import DemoLayout from './DemoLayout.vue';
</script>
