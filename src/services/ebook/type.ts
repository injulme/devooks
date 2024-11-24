/** @get 전자책 목록 조회 */
export interface EbookListGetSummary {
  id: string;
  mainImage: {
    id: string;
    imagePath: string;
  };
  price: number;
  title: string;
  wishlistId: string;
  writerName: string;
  review: {
    rating: number;
    count: number;
  };
  relatedCategoryIdList: string[];
}
export type EbookListGetResponse = {
  data: EbookListGetSummary[];
};

/** @get 전자책 상세 조회 */
export interface EbookGetSummary extends EbookListGetSummary {
  descriptionImageList: {
    id: string;
    imagePath: string;
    order: number;
  }[];
  introduction: string;
  tableOfContents: string;
  seller: {
    id: string;
    nickname: string;
    profileImagePath: string;
  };
  pageCount: number;
  pdfId: string;
  createdDate: string;
  modifiedDate: string;
  relatedCategoryIdList: string[];
}
export type EbookGetResponse = {
  ebook: EbookGetSummary;
};

/** @post 전자책 등록 */
export type EbookPostRequest = {
  pdfId: string;
  title: string;
  relatedCategoryIdList: string[];
  mainImageId: string;
  descriptionImageIdList: string[];
  price: number;
  introduction: string;
  tableOfContents: string;
};

/** @patch 전자책 수정 */
export type EbookPatchRequest = {
  ebook: {
    title: string;
    relatedCategoryIdList: string[];
    mainImageId: string;
    descriptionImageIdList: string[];
    price: number;
    introduction: string;
    tableOfContents: string;
  };
};

/** @post 전자책 메인 사진 저장 */
export type EbookMainImageRequest = {
  image: {
    base64Raw: string | ArrayBuffer;
    extension: string | undefined;
    byteSize: number | undefined;
  };
};
export type EbookMainImageResponse = {
  mainImage: {
    id: string;
    imagePath: string;
  };
};

/** @post 전자책 설명 사진 저장 */
export type EbookDescriptionImagesRequest = {
  imageList: {
    base64Raw: string | ArrayBuffer;
    extension: string | undefined;
    byteSize: number | undefined;
  }[];
};
export type EbookDescriptionImagesResponse = {
  descriptionImageList: {
    id: string;
    imagePath: string;
  }[];
};
