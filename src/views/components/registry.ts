import type { Component } from 'vue';

/** catalog の component id と各デモ画面の対応表。ルート生成に使う。 */
export const componentDemoRegistry: Record<string, () => Promise<{ default: Component }>> = {
  button:     () => import('./ButtonDemo.vue'),
  icon:       () => import('./IconDemo.vue'),
  input:      () => import('./InputDemo.vue'),
  textarea:   () => import('./TextareaDemo.vue'),
  select:     () => import('./SelectDemo.vue'),
  checkbox:   () => import('./CheckboxDemo.vue'),
  toggle:     () => import('./ToggleDemo.vue'),
  radio:      () => import('./RadioDemo.vue'),
  range:      () => import('./RangeDemo.vue'),
  searchbar:  () => import('./SearchbarDemo.vue'),
  segment:    () => import('./SegmentDemo.vue'),
  card:       () => import('./CardDemo.vue'),
  list:       () => import('./ListDemo.vue'),
  badge:      () => import('./BadgeDemo.vue'),
  avatar:     () => import('./AvatarDemo.vue'),
  accordion:  () => import('./AccordionDemo.vue'),
  fab:        () => import('./FabDemo.vue'),
  overlays:   () => import('./OverlaysDemo.vue'),
  indicators: () => import('./IndicatorsDemo.vue'),
};
