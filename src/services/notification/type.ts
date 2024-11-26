import { Pagination } from '@/lib/common';

export interface NotificationSummary {
  id: string;
  type: string;
  content: string;
  note: {
    type: string;
    reviewId: string;
    reviewerName: string;
    ebookId: string;
    ebookTitle: string;
    writtenDate: string;
    receiverId: string;
  };
  receiverId: string;
  notifiedDate: string;
  checked: boolean;
}

/** 알림 조회 */
export interface NotificationsResponse extends Pagination {
  data: NotificationSummary[];
}

export interface NotificationCountResponse {
  countOfUncheckedNotification: number;
}
