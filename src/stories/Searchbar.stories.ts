import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonSearchbar } from '@ionic/vue';

const meta: Meta = {
  title: 'Components/Searchbar',
  argTypes: {
    value: {
      control: 'text',
      description: '入力値',
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダー',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Search' } },
    },
    animated: {
      control: 'boolean',
      description: 'アニメーションを有効化',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    debounce: {
      control: 'number',
      description: 'デバウンス時間（ms）',
      table: { type: { summary: 'number' }, defaultValue: { summary: '250' } },
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    showClearButton: {
      control: 'select',
      options: ['always', 'focus', 'never'],
      description: 'クリアボタンの表示タイミング',
      table: { type: { summary: "'always' | 'focus' | 'never'" }, defaultValue: { summary: 'focus' } },
    },
    showCancelButton: {
      control: 'select',
      options: ['always', 'focus', 'never'],
      description: 'キャンセルボタンの表示タイミング',
      table: { type: { summary: "'always' | 'focus' | 'never'" }, defaultValue: { summary: 'never' } },
    },
    color: {
      control: 'select',
      options: ['light', 'medium', 'dark', 'primary'],
      description: 'テーマカラー',
      table: { type: { summary: "'light' | 'medium' | 'dark' | 'primary'" } },
    },
  },
  args: { placeholder: '検索', animated: true, showClearButton: 'focus' },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonSearchbar },
    setup: () => ({ args }),
    template: '<ion-searchbar v-bind="args" />',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonSearchbar },
    template: `
      <div style="padding:16px; max-width:480px; display:flex; flex-direction:column; gap:8px;">
        <ion-searchbar placeholder="検索" />
        <ion-searchbar :animated="true" placeholder="アニメーション" show-clear-button="focus" />
        <ion-searchbar value="入力済みの例" placeholder="検索" />
      </div>`,
  }),
};
