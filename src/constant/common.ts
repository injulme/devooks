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

export type CategoryType =
  | 'PROGRAMMING'
  | 'GAME'
  | 'BUSINESS'
  | 'AI'
  | 'HARDWARE'
  | 'DESIGN'
  | 'FINANCE'
  | 'LIBERAL_ART'
  | 'START_UP';

export const CategoryTypeCode: CodeType<CategoryType> = {
  PROGRAMMING: {
    label: 'IT / 프로그래밍',
    value: 'PROGRAMMING',
  },
  GAME: {
    label: '게임',
    value: 'GAME',
  },
  BUSINESS: {
    label: '비즈니스',
    value: 'BUSINESS',
  },
  HARDWARE: {
    label: '하드웨어',
    value: 'HARDWARE',
  },
  AI: {
    label: '인공지능',
    value: 'AI',
  },
  DESIGN: {
    label: '디자인',
    value: 'DESIGN',
  },
  FINANCE: {
    label: '금융 / 재테크',
    value: 'FINANCE',
  },
  LIBERAL_ART: {
    label: '교양',
    value: 'LIBERAL_ART',
  },
  START_UP: {
    label: '창업',
    value: 'START_UP',
  },
};
