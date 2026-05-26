import type { Meta, StoryObj } from '@storybook/vue3';
import { IonBadge } from '@ionic/vue';

const meta: Meta<typeof IonBadge> = {
  title: 'Components/Badge',
  component: IonBadge,
  argTypes: {
    color: { control: 'select', options: ['primary', 'success', 'warning', 'danger'] },
    text: { control: 'text' },
  },
  args: { color: 'primary', text: '12' },
};
export default meta;

type Story = StoryObj<typeof IonBadge>;

export const Playground: Story = {
  render: (args) => ({
    components: { IonBadge },
    setup: () => ({ args }),
    template: '<ion-badge :color="args.color">{{ args.text }}</ion-badge>',
  }),
};
