import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/vue';

const meta: Meta = { title: 'Components/Accordion' };
export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => ({
    components: { IonAccordionGroup, IonAccordion, IonItem, IonLabel },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-accordion-group>
          <ion-accordion value="first">
            <ion-item slot="header"><ion-label>セクション1</ion-label></ion-item>
            <div class="ion-padding" slot="content">セクション1の内容。</div>
          </ion-accordion>
          <ion-accordion value="second">
            <ion-item slot="header"><ion-label>セクション2</ion-label></ion-item>
            <div class="ion-padding" slot="content">セクション2の内容。</div>
          </ion-accordion>
        </ion-accordion-group>
      </div>`,
  }),
};
