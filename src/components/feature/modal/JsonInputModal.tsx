import { Button, createStyles, Group, JsonInput, Stack } from "@mantine/core";
import type { FC } from "react";
import { useCallback } from "react";
import { useState } from "react";

import { Modal } from "~/components/shared/Modal";
import type { ICreateJson } from "~/interfaces/useCase/json";
import { jsonConvert } from "~/utils/jsonConvert";

type JsonInputModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (json: ICreateJson) => void;
};

export const JsonInputModal: FC<JsonInputModalProps> = ({ isOpen, onClose, onChange }) => {
  const { classes } = useStyle();

  const [value, onSetValue] = useState("");

  const onSubmit = useCallback(() => {
    onChange({ length: 1, json: jsonConvert(JSON.parse(value)) });
    onSetValue("");
    onClose();
  }, [value]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title="JSONを入力してください">
      <Stack spacing="sm">
        <JsonInput
          value={value}
          onChange={onSetValue}
          validationError="JSONの形式が間違っています"
          formatOnBlur
          minRows={10}
          autosize={false}
          classNames={classes}
        />

        <Group spacing="sm" position="right">
          <Button type="button" variant="default" onClick={onClose}>
            キャンセル
          </Button>

          <Button type="button" onClick={onSubmit}>
            確定
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

const useStyle = createStyles<"wrapper" | "input">((theme) => {
  return {
    wrapper: {
      height: "500px",
    },
    input: {
      height: "100%",
      backgroundColor: theme.colorScheme === "light" ? "white" : theme.colors.dark[7],
    },
  };
});
