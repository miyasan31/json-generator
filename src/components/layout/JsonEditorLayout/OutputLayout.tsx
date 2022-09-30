import { Button, Group, Stack } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { useFormContext } from "react-hook-form";

import { JsonGeneratorWatcher } from "~/components/feature/form/watcher/JsonGeneratorWatcher";
import { saveButtonLabel } from "~/constants/form/label";
import type { ICreateJson } from "~/interfaces/useCase/json";

export const OutputLayout = () => {
  const { control } = useFormContext<ICreateJson>();

  return (
    <JsonGeneratorWatcher control={control}>
      {(json: string) => (
        <Stack spacing="sm" sx={{ flex: 2, height: "100%", width: "100%" }}>
          <Group spacing="sm" position="right">
            <Button type="button">{saveButtonLabel}</Button>
          </Group>

          <Prism
            language="json"
            noCopy
            withLineNumbers
            styles={(theme) => ({
              root: {
                width: "100%",
                height: "100%",
                borderRadius: theme.radius.sm,
                backgroundColor: theme.colorScheme === "light" ? "white" : theme.colors.dark[6],
                border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[4] : theme.colors.dark[4]}`,
                minHeight: 0,
              },
              scrollArea: {
                borderRadius: theme.radius.sm,
                height: "100%",
              },
              code: {
                margin: "16px 0",
                padding: 0,
              },
              line: {
                height: "100%",
                width: "100%",
                backgroundColor: theme.colorScheme === "light" ? "white" : theme.colors.dark[6],
              },
              lineContent: {
                width: "300px",
              },
            })}
          >
            {json}
          </Prism>
        </Stack>
      )}
    </JsonGeneratorWatcher>
  );
};
