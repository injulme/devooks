/** @post PDF 파일 업로드 */
export type PdfUploadResponse = {
  pdf: {
    id: string;
    uploadMemberId: string;
    createdDate: string;
    pdfInfo: {
      pageCount: number;
      filePath: string;
    };
    previewImageList: [
      {
        id: string;
        imagePath: string;
        previewOrder: number;
        pdfId: string;
      },
    ];
  };
};

/** @get 미리보기 사진 조회 summary */
export type PreviewImageSummary = {
  id: string;
  imagePath: string;
  previewOrder: number;
  pdfId: string;
};

/** @get 미리보기 사진 목록 조회 */
export type PreviewImageListResponse = {
  previewImageList: PreviewImageSummary[];
};
