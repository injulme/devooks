/** @get ebook list summary */
export type EbookListSummary = {
  id: string;
  mainImagePath: string;
  title: string;
  wishlistId: string;
  review: {
    rating: number;
    count: number;
  };
  relatedCategoryNameList: string[];
};

/** @get ebook list response */
export type EbookListResponse = {
  ebookList: EbookListSummary[];
};

/** @get ebook image path list summary */
export type ImagePathListSummary = {
  id: string;
  imagePath: string;
  order: number;
};

/** @get ebook summary */
export type EbookSummary = {
  id: string;
  mainImagePath: string;
  descriptionImagePathList: ImagePathListSummary[];
  wishlistId: string;
  title: string;
  review: {
    rating: number;
    count: number;
  };
  relatedCategoryNameList: string[];
  sellingMemberId: string;
  createdDate: string;
  modifiedDate: string;
  pageCount: number;
  price: number;
  pdfId: string;
  introduction: string;
  tableOfContents: string;
};

/** @get ebook response */
export type EbookResponse = {
  ebook: EbookSummary;
};
