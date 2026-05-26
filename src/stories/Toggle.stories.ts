import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonToggle } from '@ionic/vue';

const meta: Meta<typeof IonToggle> = {
  title: 'Components/Toggle',
  component: IonToggle,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    color: { control: 'select', options: [undefined, 'primary', 'success', 'warning', 'danger'] },
  },
  args: { checked: true, disabled: false, color: 'primary' },
};
export default meta;

type Story = StoryObj<typeof IonToggle>;

export const Playground: Story = {
  render: (args) => ({
    components: { IonToggle },
    setup: () => ({ args }),
    template: '<ion-toggle v-bind="args">ラベル</ion-toggle>',
  }),
};
