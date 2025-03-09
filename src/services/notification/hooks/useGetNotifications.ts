import { GET_notifications } from '../api';

import { useQuery } from '@tanstack/react-query';

import { useTokenStore } from '@/stores/auth-store';

export const useGetNotifications = () => {
  const accessToken = useTokenStore((state) => state.accessToken);
  return useQuery({
    queryKey: [GET_notifications.name],
    queryFn: GET_notifications,
    select: (data) => data,
    enabled: !!accessToken,
  });
};
