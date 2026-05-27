import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonList, IonItem, IonRange, IonIcon } from '@ionic/vue';
import { volumeLow, volumeHigh } from 'ionicons/icons';

const meta: Meta = {
  title: 'Components/Range',
  argTypes: {
    value: {
      control: 'number',
      description: '現在の値',
      table: { type: { summary: 'number' } },
    },
    min: {
      control: 'number',
      description: '最小値',
      table: { type: { summary: 'number' }, defaultValue: { summary: '0' } },
    },
    max: {
      control: 'number',
      description: '最大値',
      table: { type: { summary: 'number' }, defaultValue: { summary: '100' } },
    },
    step: {
      control: 'number',
      description: 'ステップ値',
      table: { type: { summary: 'number' }, defaultValue: { summary: '1' } },
    },
    pin: {
      control: 'boolean',
      description: '現在値ピンを表示',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    snaps: {
      control: 'boolean',
      description: 'ステップにスナップ',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    ticks: {
      control: 'boolean',
      description: 'ティックマークを表示',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    dualKnobs: {
      control: 'boolean',
      description: 'デュアルノブ（範囲選択）',
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
  },
  args: { value: 40, min: 0, max: 100, step: 1, pin: true },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonList, IonItem, IonRange },
    setup: () => ({ args }),
    template: `
      <ion-list>
        <ion-item>
          <ion-range v-bind="args" aria-label="Range" />
        </ion-item>
      </ion-list>`,
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonList, IonItem, IonRange, IonIcon },
    setup: () => ({ volumeLow, volumeHigh }),
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item>
            <ion-range :value="40" aria-label="音量">
              <ion-icon slot="start" :icon="volumeLow" />
              <ion-icon slot="end" :icon="volumeHigh" />
            </ion-range>
          </ion-item>
          <ion-item>
            <ion-range :dual-knobs="true" :value="{ lower: 20, upper: 80 }" aria-label="範囲" :pin="true" />
          </ion-item>
        </ion-list>
      </div>`,
  }),
};
