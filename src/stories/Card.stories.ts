import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';

const meta: Meta = {
  title: 'Components/Card',
  argTypes: {
    color: { control: 'select', options: [undefined, 'primary', 'success', 'warning', 'danger'] },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    content: { control: 'text' },
  },
  args: { color: undefined, title: 'カードタイトル', subtitle: 'サブタイトル', content: '本文テキスト。' },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent },
    setup: () => ({ args }),
    template: `
      <ion-card :color="args.color">
        <ion-card-header>
          <ion-card-subtitle>{{ args.subtitle }}</ion-card-subtitle>
          <ion-card-title>{{ args.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>{{ args.content }}</ion-card-content>
      </ion-card>`,
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent },
    template: `
      <div style="padding:16px; max-width:480px; display:flex; flex-direction:column; gap:16px;">
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>サブタイトル</ion-card-subtitle>
            <ion-card-title>カードタイトル</ion-card-title>
          </ion-card-header>
          <ion-card-content>カードの本文テキストです。背景・文字色はテーマに追従します。</ion-card-content>
        </ion-card>
        <ion-card color="primary">
          <ion-card-header><ion-card-title>主色カード</ion-card-title></ion-card-header>
          <ion-card-content>color="primary" を指定した例。</ion-card-content>
        </ion-card>
      </div>`,
  }),
};
