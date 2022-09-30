import { Button, Group, ScrollArea, Select, Stack } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

import { JsonGeneratorForm } from "~/components/feature/form/JsonGeneratorForm";
import { generateButtonLabel, generateLengthLabel } from "~/constants/form/label";
import { jsonLengthOption } from "~/constants/form/selectOption";
import type { ICreateJson } from "~/interfaces/useCase/json";

export const InputLayout = () => {
  const { control, register } = useFormContext<ICreateJson>();

  return (
    <Stack spacing="sm" sx={{ flex: 3, height: "100%" }}>
      <Group spacing="sm" position="left" align="end">
        <Controller
          control={control}
          name="length"
          render={({ field: { onChange, value } }) => {
            return (
              <Select
                label={generateLengthLabel}
                value={String(value)}
                onChange={onChange}
                data={jsonLengthOption}
                styles={{
                  root: { display: "flex", alignItems: "center", width: "fit-content", gap: "0.5rem" },
                  label: { flex: "auto", minWidth: "fit-content" },
                  input: { flex: "auto", width: "100px" },
                }}
              />
            );
          }}
        />

        <Button type="submit">{generateButtonLabel}</Button>
      </Group>

      <ScrollArea
        style={{ flex: 1 }}
        sx={(theme) => ({
          borderRadius: theme.radius.sm,
          backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[7],
          border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[4] : theme.colors.dark[4]}`,
        })}
      >
        <JsonGeneratorForm border={false} {...{ control, register }} />
      </ScrollArea>
    </Stack>
  );
};
