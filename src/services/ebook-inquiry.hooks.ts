import { ebookInquiryAPI } from './api-instance';

import {
  EbookInquiryApiCreateEbookInquiryRequest,
  EbookInquiryApiModifyEbookInquiryRequest,
} from '@leesm0518/devooks-api';
import { useMutation, useQuery } from '@tanstack/react-query';

/** 전자책 문의 목록 조회 */
export const useGetEbookInquiries = (ebookId: string) => {
  return useQuery({
    queryKey: [ebookInquiryAPI.getEbookInquiries.name, ebookId],
    queryFn: () => ebookInquiryAPI.getEbookInquiries({ ebookId, page: 1, count: 10 }),
    select: ({ data }) => data,
  });
};

/** 전자책 문의 등록 */
export const useCreateEbookInquiry = () => {
  return useMutation({
    mutationKey: [ebookInquiryAPI.createEbookInquiry.name],
    mutationFn: (data: EbookInquiryApiCreateEbookInquiryRequest) =>
      ebookInquiryAPI.createEbookInquiry(data),
  });
};

/** 전자책 문의 수정 */
export const useModifyEbookInquiry = (inquiryId: string) => {
  return useMutation({
    mutationKey: [ebookInquiryAPI.modifyEbookInquiry.name, inquiryId],
    mutationFn: (data: EbookInquiryApiModifyEbookInquiryRequest) =>
      ebookInquiryAPI.modifyEbookInquiry(data),
  });
};

/** 전자책 문의 삭제 */
export const useDeleteEbookInquiry = () => {
  return useMutation({
    mutationKey: [ebookInquiryAPI.deleteEbookInquiry.name],
    mutationFn: (inquiryId: string) => ebookInquiryAPI.deleteEbookInquiry({ inquiryId }),
  });
};
