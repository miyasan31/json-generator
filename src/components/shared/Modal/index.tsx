import { Modal as MantineModal, useMantineTheme } from "@mantine/core";
import type { FC, ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size: "sm" | "md" | "lg";
  centered?: boolean;
  withCloseButton?: boolean;
  title?: string;
};

export const Modal: FC<ModalProps> = ({
  children,
  title,
  size,
  centered = false,
  withCloseButton = true,
  onClose,
  isOpen,
}) => {
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
      styles={{
        title: {
          fontSize: "1.2rem",
          fontWeight: "bold",
        },
      }}
    >
      {children}
    </MantineModal>
  );
};
