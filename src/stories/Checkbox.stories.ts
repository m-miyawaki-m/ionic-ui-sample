import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonList, IonItem, IonCheckbox } from '@ionic/vue';

const meta: Meta = {
  title: 'Components/Checkbox',
  argTypes: {
    label: {
      control: 'text',
      description: 'ラベルテキスト（スロット）',
      table: { type: { summary: 'string' } },
    },
    checked: {
      control: 'boolean',
      description: 'チェック状態',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'fixed', 'stacked'],
      description: 'ラベルの配置',
      table: { type: { summary: "'start' | 'end' | 'fixed' | 'stacked'" }, defaultValue: { summary: 'end' } },
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'space-between'],
      description: 'ラベルとチェックボックスの配置',
      table: { type: { summary: "'start' | 'end' | 'space-between'" }, defaultValue: { summary: 'space-between' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
      description: 'テーマカラー',
      table: { type: { summary: "'primary' | 'success' | 'warning' | 'danger'" }, defaultValue: { summary: 'primary' } },
    },
  },
  args: { label: '同意する', checked: true, labelPlacement: 'end', justify: 'start' },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonList, IonItem, IonCheckbox },
    setup: () => ({ args }),
    template: `
      <ion-list>
        <ion-item>
          <ion-checkbox v-bind="args">{{ args.label }}</ion-checkbox>
        </ion-item>
      </ion-list>`,
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonList, IonItem, IonCheckbox },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item><ion-checkbox :checked="true">同意する</ion-checkbox></ion-item>
          <ion-item><ion-checkbox>ニュースを受け取る</ion-checkbox></ion-item>
          <ion-item><ion-checkbox :disabled="true">無効</ion-checkbox></ion-item>
        </ion-list>
      </div>`,
  }),
};
