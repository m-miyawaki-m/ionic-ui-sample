import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IonSpinner, IonProgressBar, IonButton, loadingController } from '@ionic/vue';

const meta: Meta = { title: 'Components/Indicators' };
export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: () => ({
    components: { IonSpinner, IonProgressBar, IonButton },
    setup() {
      async function showLoading() {
        const loading = await loadingController.create({
          message: '読み込み中…', duration: 1500,
        });
        await loading.present();
      }
      return { showLoading };
    },
    template: `
      <div style="padding:16px; max-width:480px; display:flex; flex-direction:column; gap:16px;">
        <div>
          <h3 style="margin:0 0 12px; font-size:14px; font-weight:600; color:var(--ion-color-medium);">Spinner</h3>
          <div style="display:flex; gap:24px; font-size:28px; align-items:center;">
            <ion-spinner name="lines" />
            <ion-spinner name="crescent" />
            <ion-spinner name="dots" />
            <ion-spinner name="circular" />
          </div>
        </div>
        <div>
          <h3 style="margin:0 0 12px; font-size:14px; font-weight:600; color:var(--ion-color-medium);">Progress</h3>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <ion-progress-bar :value="0.5" />
            <ion-progress-bar type="indeterminate" />
          </div>
        </div>
        <div style="margin-top:4px;">
          <ion-button @click="showLoading">Loading を表示</ion-button>
        </div>
      </div>`,
  }),
};
