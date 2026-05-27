import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DsStepper from '../../components/ds/DsStepper.vue';

const meta: Meta<typeof DsStepper> = {
  title: 'Design System/Components/Stepper',
  component: DsStepper,
};
export default meta;
type Story = StoryObj<typeof DsStepper>;

export const Default: Story = {
  render: () => ({
    components: { DsStepper },
    setup: () => ({
      steps: [
        { label: '完了', state: 'done' },
        { label: '現在', state: 'current' },
        { label: '未完了', state: 'todo' },
        { label: 'エラー', state: 'error' },
      ],
    }),
    template: '<div style="padding:24px; background: var(--bg-base);"><ds-stepper :steps="steps" /></div>',
  }),
};
