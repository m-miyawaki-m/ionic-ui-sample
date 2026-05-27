import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import DsMenu from '../../components/ds/DsMenu.vue';

const meta: Meta<typeof DsMenu> = {
  title: 'Design System/Layout/Menu',
  component: DsMenu,
};
export default meta;
type Story = StoryObj<typeof DsMenu>;

export const Default: Story = {
  render: () => ({
    components: { DsMenu },
    setup: () => ({
      selected: ref('ホーム'),
      items: [
        { label: 'ホーム', icon: 'home' },
        { label: '受信箱', icon: 'inbox', badge: 12 },
        { label: '設定', icon: 'settings' },
        { label: '無効項目', icon: 'block', disabled: true },
      ],
    }),
    template: '<div style="padding:16px; background: var(--bg-base);"><ds-menu :items="items" :selected="selected" @select="(v) => selected = v" /></div>',
  }),
};
