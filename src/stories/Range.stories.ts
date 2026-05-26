import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonList, IonItem, IonRange, IonIcon } from '@ionic/vue';
import { volumeLow, volumeHigh } from 'ionicons/icons';

const meta: Meta = { title: 'Components/Range' };
export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => ({
    components: { IonList, IonItem, IonRange, IonIcon },
    setup: () => ({ volumeLow, volumeHigh }),
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item>
            <ion-range :value="40" aria-label="音量">
              <ion-icon slot="start" :icon="volumeLow" />
              <ion-icon slot="end" :icon="volumeHigh" />
            </ion-range>
          </ion-item>
          <ion-item>
            <ion-range :dual-knobs="true" :value="{ lower: 20, upper: 80 }" aria-label="範囲" :pin="true" />
          </ion-item>
        </ion-list>
      </div>`,
  }),
};
