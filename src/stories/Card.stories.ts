import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed } from 'vue';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonCheckbox,
  IonButton,
  IonIcon,
} from '@ionic/vue';
import { chevronForward } from 'ionicons/icons';

const meta: Meta = {
  title: 'Components/Card',
  argTypes: {
    color: { control: 'select', options: [undefined, 'primary', 'success', 'warning', 'danger'] },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    content: { control: 'text' },
  },
  args: { color: undefined, title: 'カードタイトル', subtitle: 'サブタイトル', content: '本文テキスト。' },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => ({
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent },
    setup: () => ({ args }),
    template: `
      <ion-card :color="args.color">
        <ion-card-header>
          <ion-card-subtitle>{{ args.subtitle }}</ion-card-subtitle>
          <ion-card-title>{{ args.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>{{ args.content }}</ion-card-content>
      </ion-card>`,
  }),
};

export const Showcase: Story = {
  render: () => ({
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent },
    template: `
      <div style="padding:16px; max-width:480px; display:flex; flex-direction:column; gap:16px;">
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>サブタイトル</ion-card-subtitle>
            <ion-card-title>カードタイトル</ion-card-title>
          </ion-card-header>
          <ion-card-content>カードの本文テキストです。背景・文字色はテーマに追従します。</ion-card-content>
        </ion-card>
        <ion-card color="primary">
          <ion-card-header><ion-card-title>主色カード</ion-card-title></ion-card-header>
          <ion-card-content>color="primary" を指定した例。</ion-card-content>
        </ion-card>
      </div>`,
  }),
};

// 1行目: チェックボックス＋ラベル / 下5行: 「ラベル : 値」 / 右端: 詳細移行ボタン（カード全体で1つ）
export const RecordCard: Story = {
  name: 'Showcase (レコードカード)',
  render: () => ({
    components: { IonCard, IonItem, IonCheckbox, IonButton, IonIcon },
    setup: () => ({
      chevronForward,
      cards: [
        {
          color: undefined,
          checked: false,
          label: '対象に含める',
          showDetail: true,
          rows: [
            { label: '氏名', value: '山田 太郎' },
            { label: '部署', value: '営業第一課' },
            { label: '役職', value: '主任' },
            { label: '内線', value: '1234' },
            { label: '状態', value: '在席' },
          ],
        },
        {
          color: 'primary',
          checked: true,
          label: '承認済み',
          showDetail: true,
          rows: [
            { label: '伝票番号', value: 'INV-2026-0042' },
            { label: '取引先', value: '株式会社サンプル' },
            { label: '金額', value: '¥128,000' },
            { label: '期日', value: '2026-06-30' },
            { label: '担当', value: '佐藤 花子' },
          ],
        },
        {
          color: undefined,
          checked: true,
          label: '詳細ボタンなし',
          showDetail: false,
          rows: [
            { label: '項目1', value: '値1' },
            { label: '項目2', value: '値2' },
            { label: '項目3', value: '値3' },
            { label: '項目4', value: '値4' },
            { label: '項目5', value: '値5' },
          ],
        },
      ],
    }),
    template: `
      <div style="padding:16px; max-width:480px; display:flex; flex-direction:column; gap:16px;">
        <ion-card v-for="(c, i) in cards" :key="i" :color="c.color">
          <ion-item :color="c.color" lines="full">
            <ion-checkbox :checked="c.checked" label-placement="end" justify="start">{{ c.label }}</ion-checkbox>
          </ion-item>
          <div style="display:flex; align-items:stretch;">
            <div style="flex:1; padding:12px 16px; display:flex; flex-direction:column; gap:6px;">
              <div v-for="r in c.rows" :key="r.label" style="display:flex; gap:8px; font-size:14px;">
                <span style="opacity:.7; min-width:72px;">{{ r.label }}</span>
                <span>{{ r.value }}</span>
              </div>
            </div>
            <ion-button
              v-if="c.showDetail"
              fill="clear"
              :color="c.color ? 'light' : undefined"
              style="height:auto; align-self:stretch; margin:0;"
            >
              <ion-icon slot="icon-only" :icon="chevronForward" />
            </ion-button>
          </div>
        </ion-card>
      </div>`,
  }),
};

interface RecordCardArgs {
  color?: string;
  checked: boolean;
  label: string;
  showDetail: boolean;
  rows: string;
}

export const RecordCardPlayground: StoryObj<RecordCardArgs> = {
  name: 'Playground (レコードカード)',
  argTypes: {
    color: { control: 'select', options: [undefined, 'primary', 'success', 'warning', 'danger'] },
    checked: { control: 'boolean', description: '1行目チェック状態' },
    label: { control: 'text', description: '1行目ラベル' },
    showDetail: { control: 'boolean', description: '詳細移行ボタンの表示' },
    rows: { control: 'text', description: '1行＝「ラベル=値」。改行区切りで複数行。' },
  },
  args: {
    color: undefined,
    checked: true,
    label: '対象に含める',
    showDetail: true,
    rows: '氏名=山田 太郎\n部署=営業第一課\n役職=主任\n内線=1234\n状態=在席',
  },
  render: (args) => ({
    components: { IonCard, IonItem, IonCheckbox, IonButton, IonIcon },
    setup: () => {
      const parsedRows = computed(() =>
        String(args.rows || '')
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
          .map((l) => {
            const idx = l.indexOf('=');
            return idx >= 0
              ? { label: l.slice(0, idx), value: l.slice(idx + 1) }
              : { label: l, value: '' };
          }),
      );
      return { args, parsedRows, chevronForward };
    },
    template: `
      <div style="padding:16px; max-width:480px;">
        <ion-card :color="args.color">
          <ion-item :color="args.color" lines="full">
            <ion-checkbox :checked="args.checked" label-placement="end" justify="start">{{ args.label }}</ion-checkbox>
          </ion-item>
          <div style="display:flex; align-items:stretch;">
            <div style="flex:1; padding:12px 16px; display:flex; flex-direction:column; gap:6px;">
              <div v-for="r in parsedRows" :key="r.label" style="display:flex; gap:8px; font-size:14px;">
                <span style="opacity:.7; min-width:72px;">{{ r.label }}</span>
                <span>{{ r.value }}</span>
              </div>
            </div>
            <ion-button
              v-if="args.showDetail"
              fill="clear"
              :color="args.color ? 'light' : undefined"
              style="height:auto; align-self:stretch; margin:0;"
            >
              <ion-icon slot="icon-only" :icon="chevronForward" />
            </ion-button>
          </div>
        </ion-card>
      </div>`,
  }),
};
