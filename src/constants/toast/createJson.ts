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
    title: "生成中",
    message: "JSONを生成しています",
    loading: true,
    autoClose: false,
    disallowClose: true,
  },
  success: {
    id: toastId,
    color: "green",
    title: "生成成功",
    message: "JSONを生成しました",
    loading: false,
    autoClose: 2000,
  },
  error: {
    id: toastId,
    color: "red",
    title: "エラーが発生しました",
    message: "時間を空けて再試行してください",
    loading: false,
    autoClose: 2000,
  },
};
