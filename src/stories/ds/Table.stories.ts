import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DsTable from '../../components/ds/DsTable.vue';

const meta: Meta<typeof DsTable> = {
  title: 'Design System/Components/Table',
  component: DsTable,
};
export default meta;
type Story = StoryObj<typeof DsTable>;

export const Default: Story = {
  render: () => ({
    components: { DsTable },
    setup: () => ({
      headers: ['ID', '名前', 'ステータス'],
      rows: [
        [1, '田中', '有効'],
        [2, '鈴木', '無効'],
        [3, '佐藤', '有効'],
        [4, '高橋', '保留'],
      ],
    }),
    template: '<div style="padding:16px; background: var(--bg-base);"><ds-table :headers="headers" :rows="rows" /></div>',
  }),
};
