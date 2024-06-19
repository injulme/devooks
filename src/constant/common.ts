export type CodeType<T extends string> = Record<T, { label: string; value: T }>;

export type TabType = 'BEST' | 'NEW' | 'MONTH' | 'WEEK';
export const TabTypeCode: CodeType<TabType> = {
  BEST: {
    label: '책을 추천해요!',
    value: 'BEST',
  },
  NEW: {
    label: '새로 나왔어요!',
    value: 'NEW',
  },
  MONTH: {
    label: '월간 TOP 100',
    value: 'MONTH',
  },
  WEEK: {
    label: '주간 TOP 100',
    value: 'WEEK',
  },
};
