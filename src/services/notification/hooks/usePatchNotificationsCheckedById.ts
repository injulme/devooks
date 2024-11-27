import { PATCH_notifications_checked_by_id } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePatchNotificationsCheckedById = () => {
  return useMutation({
    mutationKey: [PATCH_notifications_checked_by_id.name],
    mutationFn: PATCH_notifications_checked_by_id,
  });
};
