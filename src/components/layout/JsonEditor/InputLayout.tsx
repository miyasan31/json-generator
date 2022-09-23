import { Button, Group, ScrollArea, Stack } from "@mantine/core";
import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { FormFields } from "~/components/feature/form/FormFields";
import { defaultValues } from "~/constants/form/defaultValue";
import type { JsonCreateForm } from "~/interfaces/model/From.interface";

export const InputLayout = () => {
  const { control, reset, register } = useFormContext<JsonCreateForm>();

  const onReset = useCallback(() => {
    reset(defaultValues);
  }, []);

  const onClear = useCallback(() => {
    reset({ length: 1, object: [] });
  }, []);

  return (
    <Stack spacing="sm" sx={{ height: "100%" }}>
      <Group spacing="sm" position="left" align="end">
        <Button type="button" variant="default" onClick={onClear}>
          Clear
        </Button>
        <Button type="button" variant="default" onClick={onReset}>
          Reset
        </Button>
      </Group>

      <ScrollArea
        style={{ flex: 1 }}
        sx={(theme) => ({
          borderRadius: theme.radius.sm,
          backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[7],
          border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[4] : theme.colors.dark[4]}`,
        })}
      >
        <FormFields {...{ control, register }} />
      </ScrollArea>
    </Stack>
  );
};
