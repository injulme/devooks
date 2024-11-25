import { PATCH_member_image } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePatchMemberImage = () => {
  return useMutation({
    mutationKey: [PATCH_member_image.name],
    mutationFn: PATCH_member_image,
  });
};
