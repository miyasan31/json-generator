import type { NotificationProps } from "@mantine/notifications";

const NOTIFICATION_ID = "generateJson";

/** JSON生成時のNotificationのステータス */
export const CREATE_JSON_NOTIFICATION: Record<
  "loading" | "success" | "error",
  NotificationProps & {
    id: string;
  }
> = {
  loading: {
    id: NOTIFICATION_ID,
    color: "yellow",
    title: "JSONを生成しています...",
    message: "",
    loading: true,
    autoClose: false,
    disallowClose: true,
  },
  success: {
    id: NOTIFICATION_ID,
    color: "green",
    title: "JSONを生成しました",
    message: "",
    loading: false,
    autoClose: 2000,
  },
  error: {
    id: NOTIFICATION_ID,
    color: "red",
    title: "JSONの生成に失敗しました",
    message: "時間を空けて再試行をお願いします",
    loading: false,
    autoClose: 2000,
  },
};
