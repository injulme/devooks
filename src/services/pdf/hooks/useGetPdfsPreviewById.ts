import { GET_pdfs_preview_by_id } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetPdfsPreviewById = (pdfId: string) => {
  return useQuery({
    queryKey: [GET_pdfs_preview_by_id.name],
    queryFn: () => GET_pdfs_preview_by_id(pdfId),
    select: (data) => data,
  });
};
