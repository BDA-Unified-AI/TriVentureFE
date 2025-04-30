import {
  IconType,
  NotificationInstance,
  NotificationPlacement,
} from "antd/es/notification/interface";
import { ReactNode } from "react";

export const openNotification = (
  api: NotificationInstance,
  type: IconType,
  message: string,
  description: ReactNode,
  placement: NotificationPlacement,
  duration: number,
) => {
  api[type]({
    message: message,
    description: description,
    placement,
    duration: duration,
  });
};
