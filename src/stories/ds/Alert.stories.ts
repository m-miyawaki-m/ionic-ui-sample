import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DsAlert from '../../components/ds/DsAlert.vue';

const meta: Meta<typeof DsAlert> = {
  title: 'Design System/Components/Alert',
  component: DsAlert,
  argTypes: {
    type: { control: 'inline-radio', options: ['ng', 'warning', 'ok'], description: '種類' },
  },
  args: { type: 'ok' },
};
export default meta;
type Story = StoryObj<typeof DsAlert>;

export const Playground: Story = {
  render: (args) => ({
    components: { DsAlert },
    setup: () => ({ args }),
    template: '<ds-alert v-bind="args">処理が完了しました</ds-alert>',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { DsAlert },
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start; padding:16px; background: var(--bg-base);">
        <ds-alert type="ng">エラーが発生しました</ds-alert>
        <ds-alert type="warning">警告：未保存の変更があります</ds-alert>
        <ds-alert type="ok">処理が完了しました</ds-alert>
      </div>`,
  }),
};
