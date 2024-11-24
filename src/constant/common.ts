export type CodeType<T extends string> = Record<T, { label: string; value: T }>;

// TODO: 여기 정리하기
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

export type BookDetailTabType = 'INTRODUCTION' | 'TABLE_OF_CONTENTS' | 'CLAIM' | 'REVIEW';
export const BookDetailTabTypeCode: CodeType<BookDetailTabType> = {
  INTRODUCTION: {
    label: '책 소개',
    value: 'INTRODUCTION',
  },
  TABLE_OF_CONTENTS: {
    label: '목차',
    value: 'TABLE_OF_CONTENTS',
  },
  REVIEW: {
    label: '리뷰',
    value: 'REVIEW',
  },
  CLAIM: {
    label: '환불/문의',
    value: 'CLAIM',
  },
};
