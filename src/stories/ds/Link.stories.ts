import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DsLink from '../../components/ds/DsLink.vue';

const meta: Meta<typeof DsLink> = {
  title: 'Design System/Components/Link',
  component: DsLink,
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'sub', 'visited'], description: '種類' },
  },
  args: { variant: 'primary' },
};
export default meta;
type Story = StoryObj<typeof DsLink>;

export const Playground: Story = {
  render: (args) => ({
    components: { DsLink },
    setup: () => ({ args }),
    template: '<div style="padding:16px; background: var(--bg-base);"><ds-link v-bind="args">リンクテキスト</ds-link></div>',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { DsLink },
    template: `
      <div style="display:flex; gap:16px; padding:16px; background: var(--bg-base);">
        <ds-link variant="primary">基本リンク</ds-link>
        <ds-link variant="sub">サブリンク</ds-link>
        <ds-link variant="visited">既読リンク</ds-link>
      </div>`,
  }),
};
