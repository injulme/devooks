import { PATCH_member_profile } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePatchMemberProfile = () => {
  return useMutation({
    mutationKey: [PATCH_member_profile.name],
    mutationFn: PATCH_member_profile,
  });
};
