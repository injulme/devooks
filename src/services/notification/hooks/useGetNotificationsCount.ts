import { GET_notifications_count } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetNotificationsCount = () => {
  return useQuery({
    queryKey: [GET_notifications_count.name],
    queryFn: GET_notifications_count,
    select: (data) => data,
  });
};
