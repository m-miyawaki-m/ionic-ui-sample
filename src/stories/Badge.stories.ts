import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonBadge, IonList, IonItem, IonLabel, IonChip, IonIcon } from '@ionic/vue';
import { checkmarkCircle } from 'ionicons/icons';

const meta: Meta = {
  title: 'Components/Badge',
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
      description: 'テーマカラー',
      table: { type: { summary: "'primary' | 'success' | 'warning' | 'danger'" }, defaultValue: { summary: 'primary' } },
    },
    text: {
      control: 'text',
      description: 'バッジに表示するテキスト（スロット）',
      table: { type: { summary: 'string' } },
    },
  },
  args: { color: 'primary', text: '12' },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonBadge },
    setup: () => ({ args }),
    template: '<ion-badge :color="args.color">{{ args.text }}</ion-badge>',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonBadge, IonList, IonItem, IonLabel, IonChip, IonIcon },
    setup: () => ({ checkmarkCircle }),
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item>
            <ion-label>受信箱</ion-label>
            <ion-badge slot="end" color="primary">12</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>警告</ion-label>
            <ion-badge slot="end" color="warning">3</ion-badge>
          </ion-item>
        </ion-list>
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:12px;">
          <ion-chip>標準</ion-chip>
          <ion-chip color="primary">Primary</ion-chip>
          <ion-chip color="success"><ion-icon :icon="checkmarkCircle" /><ion-label>完了</ion-label></ion-chip>
          <ion-chip :outline="true">アウトライン</ion-chip>
        </div>
      </div>`,
  }),
};
