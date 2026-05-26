import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonIcon } from '@ionic/vue';
import { heart, star, home, settings, trash, checkmarkCircle } from 'ionicons/icons';

const meta: Meta = { title: 'Components/Icon' };
export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => ({
    components: { IonIcon },
    setup: () => ({ heart, star, home, settings, trash, checkmarkCircle }),
    template: `
      <div style="display:flex; gap:20px; font-size:32px; flex-wrap:wrap; padding:16px;">
        <ion-icon :icon="heart" />
        <ion-icon :icon="star" color="warning" />
        <ion-icon :icon="home" color="primary" />
        <ion-icon :icon="settings" />
        <ion-icon :icon="trash" color="danger" />
        <ion-icon :icon="checkmarkCircle" color="success" />
      </div>`,
  }),
};
