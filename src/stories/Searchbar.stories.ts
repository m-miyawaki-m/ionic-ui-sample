import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonSearchbar } from '@ionic/vue';

const meta: Meta = { title: 'Components/Searchbar' };
export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => ({
    components: { IonSearchbar },
    template: `
      <div style="padding:16px; max-width:480px; display:flex; flex-direction:column; gap:8px;">
        <ion-searchbar placeholder="検索" />
        <ion-searchbar :animated="true" placeholder="アニメーション" show-clear-button="focus" />
        <ion-searchbar value="入力済みの例" placeholder="検索" />
      </div>`,
  }),
};
