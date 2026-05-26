export interface ListRecord {
  id: string;
  title: string;
  subtitle: string;
  body: string;
}

export const listRecords: ListRecord[] = [
  { id: '1', title: '会議メモ', subtitle: '2026-05-20', body: '次回スプリントのゴールを確認。' },
  { id: '2', title: '買い物リスト', subtitle: '2026-05-21', body: '牛乳・卵・パン・コーヒー豆。' },
  { id: '3', title: '読書記録', subtitle: '2026-05-22', body: 'リファクタリングの章を読了。' },
  { id: '4', title: '旅行計画', subtitle: '2026-05-23', body: '宿と移動手段を仮押さえ。' },
];

export function findRecord(id: string): ListRecord | undefined {
  return listRecords.find((r) => r.id === id);
}
