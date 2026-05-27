import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import DsDropdown from '../../components/ds/DsDropdown.vue';

const meta: Meta<typeof DsDropdown> = {
  title: 'Design System/Components/Dropdown',
  component: DsDropdown,
};
export default meta;
type Story = StoryObj<typeof DsDropdown>;

export const Default: Story = {
  render: () => ({
    components: { DsDropdown },
    setup: () => ({ options: ['りんご', 'みかん', 'ぶどう', 'もも'], selected: ref('みかん') }),
    template: '<div style="padding:16px; background: var(--bg-base);"><ds-dropdown :options="options" v-model="selected" /></div>',
  }),
};
