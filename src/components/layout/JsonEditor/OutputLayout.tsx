import { Button, CopyButton, Group, Stack } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { IconCheck } from "@tabler/icons";
import { useFormContext } from "react-hook-form";

import { JsonGeneratorWatch } from "~/components/feature/form/watcher/JsonGeneratorWatch";
import type { JsonCreateForm } from "~/interfaces/model/form";

export const OutputLayout = () => {
  const { control } = useFormContext<JsonCreateForm>();

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

          <Prism
            language="json"
            noCopy
            withLineNumbers
            styles={(theme) => ({
              root: {
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
                backgroundColor: theme.colorScheme === "light" ? "white" : theme.colors.dark[6],
              },
            })}
          >
            {json}
          </Prism>
        </Stack>
      )}
    </JsonGeneratorWatch>
  );
};
