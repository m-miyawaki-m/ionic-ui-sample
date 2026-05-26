import type { Meta, StoryObj } from '@storybook/vue3-vite';
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

export const Showcase: Story = {
  render: () => ({
    components: { IonButton },
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start; padding:16px; max-width:480px;">
        <ion-button>Default</ion-button>
        <ion-button color="primary">Primary</ion-button>
        <ion-button color="success">Success</ion-button>
        <ion-button color="warning">Warning</ion-button>
        <ion-button color="danger">Danger</ion-button>
        <ion-button fill="outline">Outline</ion-button>
        <ion-button fill="clear">Clear</ion-button>
        <ion-button :disabled="true">Disabled</ion-button>
        <ion-button expand="block" style="width:100%">Block</ion-button>
      </div>`,
  }),
};
