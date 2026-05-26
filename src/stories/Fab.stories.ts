import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonFabButton, IonIcon } from '@ionic/vue';
import { add, share, heart } from 'ionicons/icons';

const meta: Meta = { title: 'Components/Fab' };
export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => ({
    components: { IonFabButton, IonIcon },
    setup: () => ({ add, share, heart }),
    template: `
      <div style="padding:16px; max-width:480px; display:flex; flex-direction:column; gap:16px;">
        <p style="margin:0; font-size:14px; color:var(--ion-color-medium);">FAB ボタンのバリアント（インライン表示）</p>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <ion-fab-button>
            <ion-icon :icon="add" />
          </ion-fab-button>
          <ion-fab-button color="primary">
            <ion-icon :icon="share" />
          </ion-fab-button>
          <ion-fab-button color="danger">
            <ion-icon :icon="heart" />
          </ion-fab-button>
          <ion-fab-button size="small" color="success">
            <ion-icon :icon="add" />
          </ion-fab-button>
        </div>
      </div>`,
  }),
};
