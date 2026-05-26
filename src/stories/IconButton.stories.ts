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
    },
    iconSlot: { control: 'inline-radio', options: ['start', 'end', 'icon-only'] },
    color: { control: 'select', options: [undefined, 'primary', 'success', 'warning', 'danger'] },
    fill: { control: 'select', options: ['solid', 'outline', 'clear'] },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
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
