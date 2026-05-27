import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonList, IonItem, IonRadioGroup, IonRadio } from '@ionic/vue';

const meta: Meta = {
  title: 'Components/Radio',
  argTypes: {
    label: {
      control: 'text',
      description: 'ラベルテキスト（スロット）',
      table: { type: { summary: 'string' } },
    },
    value: {
      control: 'text',
      description: 'ラジオボタンの値',
      table: { type: { summary: 'string' } },
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
      description: 'ラベルとラジオの配置',
      table: { type: { summary: "'start' | 'end' | 'space-between'" }, defaultValue: { summary: 'space-between' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
      description: 'テーマカラー',
      table: { type: { summary: "'primary' | 'success' | 'warning' | 'danger'" }, defaultValue: { summary: 'primary' } },
    },
  },
  args: { label: '選択肢 A', value: 'a', labelPlacement: 'end' },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonList, IonItem, IonRadioGroup, IonRadio },
    setup: () => ({ args }),
    template: `
      <ion-list>
        <ion-radio-group :value="args.value">
          <ion-item>
            <ion-radio v-bind="args">{{ args.label }}</ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-list>`,
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonList, IonItem, IonRadioGroup, IonRadio },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-radio-group value="b">
            <ion-item><ion-radio value="a">選択肢 A</ion-radio></ion-item>
            <ion-item><ion-radio value="b">選択肢 B</ion-radio></ion-item>
            <ion-item><ion-radio value="c">選択肢 C</ion-radio></ion-item>
          </ion-radio-group>
        </ion-list>
      </div>`,
  }),
};
