import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';

const meta: Meta = { title: 'Components/Segment' };
export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => ({
    components: { IonSegment, IonSegmentButton, IonLabel },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-segment value="all">
          <ion-segment-button value="all"><ion-label>すべて</ion-label></ion-segment-button>
          <ion-segment-button value="fav"><ion-label>お気に入り</ion-label></ion-segment-button>
          <ion-segment-button value="archive"><ion-label>アーカイブ</ion-label></ion-segment-button>
        </ion-segment>
      </div>`,
  }),
};
