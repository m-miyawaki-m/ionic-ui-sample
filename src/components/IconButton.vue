<template>
  <ion-button :color="color" :fill="fill" :expand="expand" :disabled="disabled">
    <ion-icon v-if="icon" :icon="icon" :slot="iconSlot" />
    <template v-if="iconSlot !== 'icon-only'">{{ label }}</template>
  </ion-button>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';

// アイコン付きボタンの再利用コンポーネント。
// icon には ionicons の import 値（SVG文字列）を渡します。
withDefaults(defineProps<{
  label?: string;
  icon?: string;
  iconSlot?: 'start' | 'end' | 'icon-only';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  fill?: 'solid' | 'outline' | 'clear';
  expand?: 'block' | 'full';
  disabled?: boolean;
}>(), {
  iconSlot: 'start',
  fill: 'solid',
  disabled: false,
});
</script>
