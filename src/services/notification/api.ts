import './type';
import { NotificationCountResponse, NotificationsResponse } from './type';

import api from '@/lib/api';

/** 알림 조회 */
export async function GET_notifications(): Promise<NotificationsResponse> {
  const { data } = await api.get(`/api/v1/notifications?page=1&count=10`);
  return data;
}

/** 확인하지 않은 알림 개수 실시간 조회 */
export async function GET_notifications_count(): Promise<NotificationCountResponse> {
  const { data } = await api.get(`/api/v1/notifications/count`);
  return data;
}

/** 전체 알림 확인 여부 변경 */
export async function PATCH_notifications_checked(): Promise<void> {
  const { data } = await api.patch(`/api/v1/notifications/checked`);
  return data;
}

/** 선택된 알림 확인 여부 변경 */
export async function PATCH_notifications_checked_by_id(
  notificationId: string | null,
): Promise<void> {
  const { data } = await api.patch(`/api/v1/notifications/${notificationId}/checked`);
  return data;
}
