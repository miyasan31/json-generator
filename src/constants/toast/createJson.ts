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
    title: "In the process of being generated",
    message: "",
    loading: true,
    autoClose: false,
    disallowClose: true,
  },
  success: {
    id: toastId,
    color: "green",
    title: "Generated Successful",
    message: "",
    loading: false,
    autoClose: 2000,
  },
  error: {
    id: toastId,
    color: "red",
    title: "Failed to generated",
    message: "Please give it some time and try again.",
    loading: false,
    autoClose: 2000,
  },
};
