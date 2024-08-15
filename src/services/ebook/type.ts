/** @get ebook related category name list summary */
export type RelatedCategoryNameListGetSummary = {
  id: string;
  name: string;
};

/** @get ebook list summary */
export type EbookListGetSummary = {
  id: string;
  mainImagePath: string;
  title: string;
  wishlistId: string;
  review: {
    rating: number;
    count: number;
  };
  relatedCategoryNameList: RelatedCategoryNameListGetSummary[];
};

/** @get ebook list response */
export type EbookListGetResponse = {
  ebookList: EbookListGetSummary[];
};

/** @get ebook image path list summary */
export type ImagePathListGetSummary = {
  id: string;
  imagePath: string;
  order: number;
};

/** @get ebook summary */
export type EbookGetSummary = {
  id: string;
  mainImagePath: string;
  descriptionImagePathList: ImagePathListGetSummary[];
  wishlistId: string;
  title: string;
  review: {
    rating: number;
    count: number;
  };
  relatedCategoryNameList: RelatedCategoryNameListGetSummary[];
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
export type EbookGetResponse = {
  ebook: EbookGetSummary;
};

/** @post ebook request */
export type EbookPostRequest = {
  pdfId: string;
  title: string;
  relatedCategoryNameList: RelatedCategoryNameListGetSummary[];
  mainImageId: string;
  descriptionImageIdList: string[];
  price: number;
  introduction: string;
  tableOfContents: string;
};

/** @post ebook response */
export type EbookPostResponse = {
  ebook: {
    id: string;
    pdfId: string;
    mainImageId: string;
    relatedCategoryNameList: RelatedCategoryNameListGetSummary[];
    title: string;
    price: number;
    tableOfContents: string;
    introduction: string;
    createdDate: string;
    modifiedDate: string;
    descriptionImageList: ImagePathListGetSummary[];
    sellingMemberId: string;
    deletedDate: string;
  };
};

/** @patch ebook request */
export type EbookPatchRequest = {
  ebook: {
    title: string;
    relatedCategoryNameList: RelatedCategoryNameListGetSummary[];
    mainImageId: string;
    descriptionImageIdList: string[];
    introduction: string;
    tableOfContents: string;
    price: number;
  };
  isChanged: {
    title: boolean;
    content: boolean;
    imageIdList: boolean;
  };
};

/** @patch ebook response */
export type EbookPatchResponse = {
  ebook: {
    id: string;
    pdfId: string;
    mainImageId: string;
    relatedCategoryNameList: RelatedCategoryNameListGetSummary[];
    title: string;
    price: number;
    tableOfContents: string;
    introduction: string;
    createdDate: string;
    modifiedDate: string;
    descriptionImageList: ImagePathListGetSummary[];
    sellingMemberId: string;
    deletedDate: string;
  };
};
