import { GET_notifications } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetNotifications = () => {
  return useQuery({
    queryKey: [GET_notifications.name],
    queryFn: GET_notifications,
    select: (data) => data,
  });
};
