import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonToggle, IonList, IonItem } from '@ionic/vue';

const meta: Meta = {
  title: 'Components/Toggle',
  argTypes: {
    label: {
      control: 'text',
      description: 'ラベルテキスト（スロット）',
      table: { type: { summary: 'string' } },
    },
    checked: {
      control: 'boolean',
      description: 'オン/オフ状態',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
      description: 'テーマカラー',
      table: { type: { summary: "'primary' | 'success' | 'warning' | 'danger'" }, defaultValue: { summary: 'primary' } },
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'fixed', 'stacked'],
      description: 'ラベルの配置',
      table: { type: { summary: "'start' | 'end' | 'fixed' | 'stacked'" }, defaultValue: { summary: 'start' } },
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'space-between'],
      description: 'ラベルとトグルの配置',
      table: { type: { summary: "'start' | 'end' | 'space-between'" }, defaultValue: { summary: 'space-between' } },
    },
    enableOnOffLabels: {
      control: 'boolean',
      description: 'ON/OFFラベルを表示',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
  args: { label: '通知', checked: true, color: 'primary' },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonToggle },
    setup: () => ({ args }),
    template: '<ion-toggle v-bind="args">{{ args.label }}</ion-toggle>',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonToggle, IonList, IonItem },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item><ion-toggle :checked="true">通知</ion-toggle></ion-item>
          <ion-item><ion-toggle color="success">ダークモード</ion-toggle></ion-item>
          <ion-item><ion-toggle :disabled="true">無効</ion-toggle></ion-item>
        </ion-list>
      </div>`,
  }),
};
