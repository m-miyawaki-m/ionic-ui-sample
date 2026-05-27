import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import DsDialog from '../../components/ds/DsDialog.vue';

const meta: Meta<typeof DsDialog> = {
  title: 'Design System/Components/Dialog',
  component: DsDialog,
};
export default meta;
type Story = StoryObj<typeof DsDialog>;

export const Default: Story = {
  render: () => ({
    components: { DsDialog },
    setup: () => {
      const selected = ref('項目B');
      return { selected, items: ['項目A', '項目B', '項目C', '項目D'] };
    },
    template: '<ds-dialog title="項目を選択" :items="items" :selected="selected" @select="(v) => selected = v" />',
  }),
};
