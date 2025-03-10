import { ebookAPI } from './api-instance';

import { useRouter } from 'next/navigation';

import { EbookApiCreateEbookRequest, EbookApiModifyEbookRequest } from '@leesm0518/devooks-api';
import { useMutation, useQuery } from '@tanstack/react-query';

/** 전자책 목록 조회 */
export const useGetEbooks = () => {
  return useQuery({
    queryKey: [ebookAPI.getEbooks.name],
    queryFn: () => ebookAPI.getEbooks({ page: 1, count: 10 }),
    select: ({ data }) => data,
  });
};

//전자책 등록
export const useCreateEbook = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [ebookAPI.createEbook.name],
    mutationFn: (data: EbookApiCreateEbookRequest) => ebookAPI.createEbook(data),
    // onSuccess: (data: CreateEbookResponse) => {
    //   return router.push(`/book/${data.ebook.id}`);
    // },
  });
};

//전자책 상세 조회
export const useGetDetailOfEbook = (ebookId: string) => {
  return useQuery({
    queryKey: [ebookAPI.getDetailOfEbook.name, ebookId],
    queryFn: () => ebookAPI.getDetailOfEbook({ ebookId }),
    select: ({ data }) => data,
  });
};

//전자책 수정
export const useModifyEbook = (ebookId: string) => {
  return useMutation({
    mutationKey: [ebookAPI.modifyEbook.name, ebookId],
    mutationFn: (data: EbookApiModifyEbookRequest) => ebookAPI.modifyEbook(data),
  });
};

//전자책 삭제
export const useDeleteEbook = () => {
  return useMutation({
    mutationKey: [ebookAPI.deleteEbook.name],
    mutationFn: (ebookId: string) => ebookAPI.deleteEbook({ ebookId }),
  });
};
