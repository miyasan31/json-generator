import { Button, CopyButton, Group, JsonInput, Select, Stack } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { JsonGeneratorWatch } from "~/components/feature/form/watcher/JsonGeneratorWatch";
import { jsonLengthOption } from "~/constants/form/selectOption";
import type { JsonCreateForm } from "~/interfaces/model/From.interface";

export const OutputLayout = () => {
  const { control } = useFormContext<JsonCreateForm>();

  return (
    <JsonGeneratorWatch control={control}>
      {(json: string) => (
        <Stack spacing="sm" sx={{ height: "100%" }}>
          <Group spacing="sm" position="right">
            <Controller
              control={control}
              name="length"
              render={({ field: { onChange, value } }) => {
                return (
                  <Select
                    label="Length"
                    value={String(value)}
                    onChange={onChange}
                    data={jsonLengthOption}
                    styles={{
                      root: { display: "flex", alignItems: "center", width: "fit-content", gap: "0.5rem" },
                      label: { flex: "auto", minWidth: "fit-content" },
                      input: { flex: "auto", width: "80px", textAlign: "right" },
                    }}
                  />
                );
              }}
            />
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
