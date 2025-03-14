import { notificationAPI } from './api-instance';

import { NotificationApiCheckNotifications1Request } from '@leesm0518/devooks-api';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/stores/auth-store';

/** 알림 목록 조회 */
export const useGetNotifications = () => {
  const userInfo = useAuthStore((state) => state);
  return useQuery({
    queryKey: [notificationAPI.getNotifications.name],
    queryFn: () => notificationAPI.getNotifications({ page: 1, count: 10 }),
    select: ({ data }) => data,
    enabled: !!userInfo.id,
  });
};

/** 확인하지 않은 알림 개수 실시간 조회 */
export const useStreamCountOfUncheckedNotifications = () => {
  return useQuery({
    queryKey: [notificationAPI.streamCountOfUncheckedNotifications.name],
    queryFn: () => notificationAPI.streamCountOfUncheckedNotifications(),
    select: ({ data }) => data,
  });
};

/** 전체 알림 확인 여부 변경 */
export const useCheckNotifications = () => {
  return useMutation({
    mutationKey: [notificationAPI.checkNotifications.name],
    mutationFn: () => notificationAPI.checkNotifications(),
  });
};

/** 선택된 알림 확인 여부 변경 */
export const useCheckNotifications1 = () => {
  return useMutation({
    mutationKey: [notificationAPI.checkNotifications1.name],
    mutationFn: (data: NotificationApiCheckNotifications1Request) =>
      notificationAPI.checkNotifications1(data),
  });
};
