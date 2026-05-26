import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonList, IonItem, IonLabel, IonAvatar, IonThumbnail } from '@ionic/vue';

const meta: Meta = { title: 'Components/Avatar' };
export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => ({
    components: { IonList, IonItem, IonLabel, IonAvatar, IonThumbnail },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-item>
            <ion-avatar slot="start"><img alt="avatar" src="https://i.pravatar.cc/80?img=1" /></ion-avatar>
            <ion-label>アバター付き項目</ion-label>
          </ion-item>
          <ion-item>
            <ion-thumbnail slot="start"><img alt="thumb" src="https://picsum.photos/120" /></ion-thumbnail>
            <ion-label>サムネイル付き項目</ion-label>
          </ion-item>
        </ion-list>
      </div>`,
  }),
};
