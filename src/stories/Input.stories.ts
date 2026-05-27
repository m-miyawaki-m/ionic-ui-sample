import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonInput, IonItem, IonList } from '@ionic/vue';

const meta: Meta = {
  title: 'Components/Input',
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
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: '入力タイプ',
      table: { type: { summary: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url'" }, defaultValue: { summary: 'text' } },
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダー',
      table: { type: { summary: 'string' } },
    },
    value: {
      control: 'text',
      description: '入力値',
      table: { type: { summary: 'string' } },
    },
    clearInput: {
      control: 'boolean',
      description: 'クリアボタンを表示',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    readonly: {
      control: 'boolean',
      description: '読み取り専用',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    counter: {
      control: 'boolean',
      description: '文字数カウンターを表示',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    maxlength: {
      control: 'number',
      description: '最大文字数',
      table: { type: { summary: 'number' } },
    },
  },
  args: { label: '名前', labelPlacement: 'floating', type: 'text', placeholder: '入力してください', clearInput: true },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonInput, IonItem, IonList },
    setup: () => ({ args }),
    template: '<ion-list><ion-item><ion-input v-bind="args" /></ion-item></ion-list>',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonInput, IonItem, IonList },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item>
            <ion-input label="名前" label-placement="floating" placeholder="山田太郎" />
          </ion-item>
          <ion-item>
            <ion-input label="メール" type="email" label-placement="stacked" placeholder="a@example.com" />
          </ion-item>
          <ion-item>
            <ion-input label="パスワード" type="password" label-placement="floating" />
          </ion-item>
          <ion-item>
            <ion-input label="クリア可" :clear-input="true" value="編集してください" />
          </ion-item>
        </ion-list>
      </div>`,
  }),
};
