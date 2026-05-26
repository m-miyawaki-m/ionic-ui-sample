import type { Meta, StoryObj } from '@storybook/vue3';
import { IonButton } from '@ionic/vue';

const meta: Meta<typeof IonButton> = {
  title: 'Components/Button',
  component: IonButton,
  argTypes: {
    color: { control: 'select', options: ['primary', 'success', 'warning', 'danger'] },
    fill: { control: 'select', options: ['solid', 'outline', 'clear'] },
    expand: { control: 'select', options: [undefined, 'block', 'full'] },
    disabled: { control: 'boolean' },
  },
  args: { color: 'primary', fill: 'solid', disabled: false },
};
export default meta;

type Story = StoryObj<typeof IonButton>;

export const Playground: Story = {
  render: (args) => ({
    components: { IonButton },
    setup: () => ({ args }),
    template: '<ion-button v-bind="args">Button</ion-button>',
  }),
};
