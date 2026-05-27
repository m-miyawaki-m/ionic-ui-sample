import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonDatetime } from '@ionic/vue';

const meta: Meta = {
  title: 'Components/Calendar',
  argTypes: {
    presentation: {
      control: 'select',
      options: ['date', 'date-time', 'time', 'month', 'year', 'month-year'],
      description: '表示形式',
      table: {
        type: { summary: "'date' | 'date-time' | 'time' | 'month' | 'year' | 'month-year'" },
        defaultValue: { summary: 'date-time' },
      },
    },
    readonly: { control: 'boolean', description: '読み取り専用', table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } } },
  },
  args: { presentation: 'date', readonly: false },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonDatetime },
    setup: () => ({ args }),
    template: '<ion-datetime v-bind="args" />',
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonDatetime },
    template: `
      <div style="display:flex; gap:24px; flex-wrap:wrap; padding:16px; background: var(--app-bg);">
        <ion-datetime presentation="date" />
        <ion-datetime presentation="time" />
      </div>`,
  }),
};
