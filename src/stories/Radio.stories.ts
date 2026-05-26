import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonList, IonItem, IonRadioGroup, IonRadio } from '@ionic/vue';

const meta: Meta = { title: 'Components/Radio' };
export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => ({
    components: { IonList, IonItem, IonRadioGroup, IonRadio },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-list>
          <ion-radio-group value="b">
            <ion-item><ion-radio value="a">選択肢 A</ion-radio></ion-item>
            <ion-item><ion-radio value="b">選択肢 B</ion-radio></ion-item>
            <ion-item><ion-radio value="c">選択肢 C</ion-radio></ion-item>
          </ion-radio-group>
        </ion-list>
      </div>`,
  }),
};
