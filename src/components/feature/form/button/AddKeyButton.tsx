import { Button } from "@mantine/core";
import type { FC } from "react";

type AddKeyButtonProps = {
  onAppend: () => void;
};

export const AddKeyButton: FC<AddKeyButtonProps> = ({ onAppend }) => {
  return (
    <Button size="xs" mt="xs" type="button" color="red" variant="outline" onClick={onAppend} sx={{ minHeight: 28 }}>
      キーを追加する
    </Button>
  );
};
