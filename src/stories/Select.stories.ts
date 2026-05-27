import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/vue';

const meta: Meta = {
  title: 'Components/Select',
  argTypes: {
    label: {
      control: 'text',
      description: 'ラベルテキスト',
      table: { type: { summary: 'string' } },
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'fixed', 'floating', 'stacked'],
      description: 'ラベルの配置',
      table: { type: { summary: "'start' | 'end' | 'fixed' | 'floating' | 'stacked'" }, defaultValue: { summary: 'start' } },
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダー',
      table: { type: { summary: 'string' } },
    },
    value: {
      control: 'text',
      description: '選択値',
      table: { type: { summary: 'string' } },
    },
    multiple: {
      control: 'boolean',
      description: '複数選択',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    interface: {
      control: 'select',
      options: ['action-sheet', 'alert', 'popover'],
      description: '選択UIの種類',
      table: { type: { summary: "'action-sheet' | 'alert' | 'popover'" }, defaultValue: { summary: 'alert' } },
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
  args: { label: '果物', placeholder: '選択', interface: 'alert', multiple: false },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonList, IonItem, IonSelect, IonSelectOption },
    setup: () => ({ args }),
    template: `
      <ion-list>
        <ion-item>
          <ion-select v-bind="args">
            <ion-select-option value="apple">りんご</ion-select-option>
            <ion-select-option value="orange">みかん</ion-select-option>
            <ion-select-option value="grape">ぶどう</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>`,
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonList, IonItem, IonSelect, IonSelectOption },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item>
            <ion-select label="果物" placeholder="選択">
              <ion-select-option value="apple">りんご</ion-select-option>
              <ion-select-option value="orange">みかん</ion-select-option>
              <ion-select-option value="grape">ぶどう</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-select label="複数選択" :multiple="true" placeholder="選択">
              <ion-select-option value="a">A</ion-select-option>
              <ion-select-option value="b">B</ion-select-option>
              <ion-select-option value="c">C</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </div>`,
  }),
};
