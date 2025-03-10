import { ebookInquiryCommentAPI } from './api-instance';

import {
  EbookInquiryCommentApiCreateEbookInquiryCommentRequest,
  EbookInquiryCommentApiModifyEbookInquiryCommentRequest,
} from '@leesm0518/devooks-api';
import { useMutation, useQuery } from '@tanstack/react-query';

/** 전자책 문의 댓글 목록 조회 */
export const useGetEbookInquiryComments = (inquiryId: string) => {
  return useQuery({
    queryKey: [ebookInquiryCommentAPI.getEbookInquiryComments.name, inquiryId],
    queryFn: () =>
      ebookInquiryCommentAPI.getEbookInquiryComments({ inquiryId, page: 1, count: 10 }),
    select: ({ data }) => data,
  });
};

/** 전자책 문의 댓글 등록 */
export const useCreateEbookInquiryComment = () => {
  return useMutation({
    mutationKey: [ebookInquiryCommentAPI.createEbookInquiryComment.name],
    mutationFn: (data: EbookInquiryCommentApiCreateEbookInquiryCommentRequest) =>
      ebookInquiryCommentAPI.createEbookInquiryComment(data),
  });
};

/** 전자책 문의 댓글 수정 */
export const useModifyEbookInquiryComment = (commentId: string) => {
  return useMutation({
    mutationKey: [ebookInquiryCommentAPI.modifyEbookInquiryComment.name, commentId],
    mutationFn: (data: EbookInquiryCommentApiModifyEbookInquiryCommentRequest) =>
      ebookInquiryCommentAPI.modifyEbookInquiryComment(data),
  });
};

/** 전자책 문의 댓글 삭제 */
export const useDeleteEbookInquiryComment = () => {
  return useMutation({
    mutationKey: [ebookInquiryCommentAPI.deleteEbookInquiryComment.name],
    mutationFn: (commentId: string) =>
      ebookInquiryCommentAPI.deleteEbookInquiryComment({ commentId }),
  });
};
