import { Button, CopyButton, Group, JsonInput, Stack } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import React from "react";
import { useFormContext } from "react-hook-form";

import { JsonGeneratorWatch } from "~/components/feature/form/watcher/JsonGeneratorWatch";

export const OutputLayout = () => {
  const { control } = useFormContext();

  return (
    <JsonGeneratorWatch control={control}>
      {(json: string) => (
        <Stack spacing="sm" sx={{ flex: 2, height: "100%" }}>
          <Group spacing="sm" position="right">
            <CopyButton value={json}>
              {({ copied, copy: onCopy }) => (
                <Button leftIcon={copied && <IconCheck size={16} />} onClick={onCopy}>
                  {copied ? "Copied JSON" : "Copy JSON"}
                </Button>
              )}
            </CopyButton>
            <Button type="button">Save</Button>
          </Group>

          <JsonInput
            value={json}
            formatOnBlur
            autosize={false}
            styles={{
              root: { flex: 1 },
              wrapper: { height: "100%" },
              input: { height: "100%" },
            }}
          />
        </Stack>
      )}
    </JsonGeneratorWatch>
  );
};
