import { DELETE_ebooks_by_id } from '../api';

import { useMutation } from '@tanstack/react-query';

export const useDeleteEbooksById = () => {
  return useMutation({
    mutationKey: [DELETE_ebooks_by_id.name],
    mutationFn: DELETE_ebooks_by_id,
  });
};
