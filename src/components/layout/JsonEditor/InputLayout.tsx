import { Button, Group, ScrollArea, Select, Stack } from "@mantine/core";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { ObjectFormField } from "~/components/feature/form/ObjectFormField";
import { jsonLengthOption } from "~/constants/form/selectOption";

export const InputLayout = () => {
  const { control, register } = useFormContext();

  return (
    <Stack spacing="sm" sx={{ height: "100%" }}>
      <Group spacing="sm" position="left" align="end">
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

        <Button type="submit">Generate</Button>
      </Group>

      <ScrollArea
        style={{ flex: 1 }}
        sx={(theme) => ({
          borderRadius: theme.radius.sm,
          backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[7],
          border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[4] : theme.colors.dark[4]}`,
        })}
      >
        {/*<FormFields {...{ control, register }} />*/}
        <ObjectFormField name="object" border={false} {...{ control, register }} />
      </ScrollArea>
    </Stack>
  );
};
