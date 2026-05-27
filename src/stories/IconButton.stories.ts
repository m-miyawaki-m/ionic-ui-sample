import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { heart, star, trash, add, share } from 'ionicons/icons';
import IconButton from '../components/IconButton.vue';


const meta: Meta<typeof IconButton> = {
  title: 'Custom/IconButton',
  component: IconButton,
  argTypes: {
    // アイコンは「名前を選ぶ → 実体(SVG)を渡す」ために mapping を使う
    icon: {
      control: 'select',
      options: ['heart', 'star', 'trash', 'add', 'share'],
      mapping: { heart, star, trash, add, share },
      description: '表示するアイコン',
      table: { type: { summary: 'string (ionicons SVG data)' } },
    },
    iconSlot: {
      control: 'inline-radio',
      options: ['start', 'end', 'icon-only'],
      description: 'アイコンのスロット位置',
      table: { type: { summary: "'start' | 'end' | 'icon-only'" }, defaultValue: { summary: 'start' } },
    },
    color: {
      control: 'select',
      options: [undefined, 'primary', 'success', 'warning', 'danger'],
      description: 'テーマカラー',
      table: { type: { summary: 'string' } },
    },
    fill: {
      control: 'select',
      options: ['solid', 'outline', 'clear'],
      description: '塗りのスタイル',
      table: { type: { summary: "'solid' | 'outline' | 'clear'" }, defaultValue: { summary: 'solid' } },
    },
    label: {
      control: 'text',
      description: 'ボタンのラベルテキスト',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
  args: { label: 'お気に入り', icon: 'heart', iconSlot: 'start', color: 'primary', fill: 'solid', disabled: false },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {
  render: (args) => ({
    components: { IconButton },
    setup: () => ({ args }),
    template: '<icon-button v-bind="args" />',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IconButton },
    setup: () => ({ heart, share, trash, add }),
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start; padding:16px; max-width:480px;">
        <icon-button label="お気に入り" :icon="heart" color="primary" />
        <icon-button label="共有" :icon="share" icon-slot="end" fill="outline" />
        <icon-button label="削除" :icon="trash" color="danger" fill="clear" />
        <icon-button :icon="add" icon-slot="icon-only" color="success" />
      </div>`,
  }),
};
