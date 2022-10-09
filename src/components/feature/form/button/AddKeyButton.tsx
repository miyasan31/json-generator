import { Button } from "@mantine/core";
import type { FC } from "react";

import { addKeyLabel } from "~/constants/form/label";

type AddKeyButtonProps = {
  onAppend: () => void;
};

export const AddKeyButton: FC<AddKeyButtonProps> = ({ onAppend }) => {
  return (
    <Button size="xs" mt="xs" type="button" color="red" variant="outline" onClick={onAppend}>
      {addKeyLabel}
    </Button>
  );
};
