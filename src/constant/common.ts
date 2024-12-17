export type CodeType<T extends string> = Record<T, { label: string; value: T }>;

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
