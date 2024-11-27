import { useEffect, useState } from 'react';

import { useGetNotifications } from '@/services/notification/hooks/useGetNotifications';
import { usePatchNotificationsChecked } from '@/services/notification/hooks/usePatchNotificationsChecked';
import { usePatchNotificationsCheckedById } from '@/services/notification/hooks/usePatchNotificationsCheckedById';
import dayjs from 'dayjs';
import { Bell } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function NotificationPopover() {
  const { data: notificationsData } = useGetNotifications();
  const [notifications, setNotifications] = useState(notificationsData?.data || []);
  const { mutate: patchNotificationsChecked } = usePatchNotificationsChecked();
  const { mutate: patchNotificationsCheckedById } = usePatchNotificationsCheckedById();

  useEffect(() => {
    if (notificationsData?.data) {
      setNotifications(notificationsData.data);
    }
  }, [notificationsData]);

  const onNotificationAllChecked = () => {
    patchNotificationsChecked();
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        checked: true,
      })),
    );
  };

  const onNotificationCheckedById = (notificationId: string) => {
    patchNotificationsCheckedById(notificationId);
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, checked: true } : notification,
      ),
    );
  };
  // TODO: pagination 적용 필요
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">알림</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[100] w-80">
        <div className="grid gap-4">
          <div className="flex justify-between">
            <h4 className="font-medium leading-none">알림</h4>
            <span
              className="cursor-pointer text-xs text-gray-500 underline hover:text-gray-800"
              onClick={onNotificationAllChecked}
            >
              모두 읽기
            </span>
          </div>
          <div className="flex flex-col gap-5">
            {notifications && notifications?.length > 0
              ? notifications?.map((notification) => {
                  return (
                    <div
                      key={notification.id}
                      className="relative flex cursor-pointer flex-col text-sm"
                      onClick={() => {
                        onNotificationCheckedById(notification.id);
                      }}
                    >
                      {!notification.checked && (
                        <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
                      )}
                      <span>{dayjs(notification.notifiedDate).format('MM월 DD일 HH:mm:ss')}</span>
                      <span>{notification.content}</span>
                    </div>
                  );
                })
              : '알림이 없습니다.'}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
