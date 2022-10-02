import type { NotificationProps } from "@mantine/notifications";

const toastId = "generateJson";

export const createJsonNotification: Record<
  "loading" | "success" | "error",
  NotificationProps & {
    id: string;
  }
> = {
  loading: {
    id: toastId,
    color: "yellow",
    title: "JSONを生成しています...",
    message: "",
    loading: true,
    autoClose: false,
    disallowClose: true,
  },
  success: {
    id: toastId,
    color: "green",
    title: "JSONを生成しました",
    message: "",
    loading: false,
    autoClose: 2000,
  },
  error: {
    id: toastId,
    color: "red",
    title: "JSONの生成に失敗しました",
    message: "時間を空けて再試行をお願いします",
    loading: false,
    autoClose: 2000,
  },
};
