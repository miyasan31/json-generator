import { ActionIcon, Tooltip } from "@mantine/core";
import { IconX } from "@tabler/icons";
import type { FC } from "react";

type DeleteButtonProps = {
  index: number;
  onRemove: (index: number) => void;
};

export const DeleteButton: FC<DeleteButtonProps> = ({ index, onRemove }) => {
  return (
    <Tooltip label="削除する" position="top-start">
      <ActionIcon mt={26} component="button" onClick={() => onRemove(index)}>
        <IconX size={16} color="red" />
      </ActionIcon>
    </Tooltip>
  );
};
