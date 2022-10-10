import { createStyles } from "@mantine/core";

export const useObjectFieldStyle = createStyles<"root", { isBorder: boolean }>((theme, params) => {
  const { isBorder } = params;

  return {
    root: {
      borderRadius: theme.radius.sm,
      padding: theme.spacing.lg,
      marginTop: theme.spacing.xs,
      border: isBorder
        ? `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[3] : theme.colors.dark[5]}`
        : "",
    },
  };
});
