import { Button, Group, JsonInput, Stack } from "@mantine/core";
import type { FC } from "react";
import { useCallback } from "react";
import { useState } from "react";

import { Modal } from "~/components/shared/Modal";
import { cancelButtonLabel, importExecutionButtonLabel } from "~/constants/form/label";
import type { ICreateJson } from "~/interfaces/useCase/json";
import { jsonConvert } from "~/utils/jsonConvert";

type JsonInputModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (json: ICreateJson) => void;
};

export const JsonInputModal: FC<JsonInputModalProps> = ({ isOpen, onClose, onChange }) => {
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
          styles={{
            wrapper: { height: "500px" },
            input: { height: "100%" },
          }}
        />

        <Group spacing="sm" position="right">
          <Button type="button" variant="default" onClick={onClose}>
            {cancelButtonLabel}
          </Button>

          <Button type="button" onClick={onSubmit}>
            {importExecutionButtonLabel}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
