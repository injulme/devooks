import { PATCH_notifications_checked } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostNotificationsChecked = () => {
  return useMutation({
    mutationKey: [PATCH_notifications_checked.name],
    mutationFn: PATCH_notifications_checked,
  });
};
