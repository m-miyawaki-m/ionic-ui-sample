import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';

const meta: Meta = {
  title: 'Components/Segment',
  argTypes: {
    value: {
      control: 'text',
      description: '選択中のセグメント値',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    scrollable: {
      control: 'boolean',
      description: 'スクロール可能',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
      description: 'テーマカラー',
      table: { type: { summary: "'primary' | 'success' | 'warning' | 'danger'" }, defaultValue: { summary: 'primary' } },
    },
  },
  args: { value: 'all' },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonSegment, IonSegmentButton, IonLabel },
    setup: () => ({ args }),
    template: `
      <ion-segment v-bind="args">
        <ion-segment-button value="all"><ion-label>すべて</ion-label></ion-segment-button>
        <ion-segment-button value="fav"><ion-label>お気に入り</ion-label></ion-segment-button>
        <ion-segment-button value="archive"><ion-label>アーカイブ</ion-label></ion-segment-button>
      </ion-segment>`,
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonSegment, IonSegmentButton, IonLabel },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-segment value="all">
          <ion-segment-button value="all"><ion-label>すべて</ion-label></ion-segment-button>
          <ion-segment-button value="fav"><ion-label>お気に入り</ion-label></ion-segment-button>
          <ion-segment-button value="archive"><ion-label>アーカイブ</ion-label></ion-segment-button>
        </ion-segment>
      </div>`,
  }),
};
