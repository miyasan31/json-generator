import { createStyles, Modal as MantineModal, useMantineTheme } from "@mantine/core";
import type { FC, ReactNode } from "react";

import { useMediaQuery } from "~/libs/mantine/useMediaQuery";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size: "sm" | "md" | "lg";
  centered?: boolean;
  withCloseButton?: boolean;
  title?: string;
  isBorder?: boolean;
};

export const Modal: FC<ModalProps> = ({
  children,
  title,
  size,
  centered = false,
  withCloseButton = true,
  isBorder = false,
  onClose,
  isOpen,
}) => {
  const { classes } = useStyle({ isBorder });
  const isMediumScreen = useMediaQuery("md");
  const { colorScheme, colors } = useMantineTheme();

  return (
    <MantineModal
      overlayColor={colorScheme === "light" ? colors.gray[6] : colors.dark[4]}
      title={title}
      transitionDuration={0}
      size={size}
      centered={centered}
      withCloseButton={withCloseButton}
      opened={isOpen}
      onClose={onClose}
      closeOnClickOutside={false}
      overflow="inside"
      fullScreen={!isMediumScreen}
      classNames={classes}
    >
      {children}
    </MantineModal>
  );
};

const useStyle = createStyles<"title" | "body", { isBorder: boolean }>((theme, params) => {
  const { isBorder } = params;

  return {
    title: {
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    body: isBorder
      ? {
          borderRadius: theme.radius.sm,
          border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[4] : theme.colors.dark[4]}`,
        }
      : {},
  };
});
