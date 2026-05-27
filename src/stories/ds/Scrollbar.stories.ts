import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DsScrollbar from '../../components/ds/DsScrollbar.vue';

const meta: Meta<typeof DsScrollbar> = {
  title: 'Design System/Layout/Scrollbar',
  component: DsScrollbar,
};
export default meta;
type Story = StoryObj<typeof DsScrollbar>;

export const Default: Story = {
  render: () => ({
    components: { DsScrollbar },
    template: `
      <div style="padding:16px; background: var(--bg-base);">
        <ds-scrollbar>
          <p v-for="n in 12" :key="n">スクロール行 {{ n }} — 横にも縦にもスクロールできます。カスタムスクロールバーの色はトークンに追従します。</p>
        </ds-scrollbar>
      </div>`,
  }),
};
