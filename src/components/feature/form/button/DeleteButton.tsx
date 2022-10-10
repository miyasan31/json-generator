import { ActionIcon, Tooltip } from "@mantine/core";
import { IconX } from "@tabler/icons";
import type { FC } from "react";

import { ICON_SIZE } from "~/constants/form/iconSize";

type DeleteButtonProps = {
  index: number;
  onRemove: (index: number) => void;
};

export const DeleteButton: FC<DeleteButtonProps> = ({ index, onRemove }) => {
  return (
    <Tooltip label="削除する" position="top-start">
      <ActionIcon mt={26} component="button" onClick={() => onRemove(index)}>
        <IconX size={ICON_SIZE} color="red" />
      </ActionIcon>
    </Tooltip>
  );
};
