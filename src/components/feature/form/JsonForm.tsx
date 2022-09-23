import { Button, CopyButton, Group, JsonInput, ScrollArea, Stack } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import { useCallback } from "react";
import { FormProvider } from "react-hook-form";

import { FormFields } from "~/components/feature/form/FormFields";
import type { JsonCreateForm } from "~/components/feature/form/From.interface";
import { JsonGeneratorWatch } from "~/components/feature/form/watcher/JsonGeneratorWatch";
import { useRHForm } from "~/components/lib/react-hook-form/useRHForm";

const defaultValues: JsonCreateForm = {
  object: [
    {
      keyName: "id",
      valueType: "number",
      options: { dummyType: "autoincrement" },
    },
    {
      keyName: "tweet",
      valueType: "string",
      options: { dummyType: "name", prefix: "", suffix: "" },
    },
    {
      keyName: "admin",
      valueType: "boolean",
      options: { dummyType: "random" },
    },
    {
      keyName: "idList",
      valueType: "array",
      options: {
        length: 5,
        item: {
          keyName: "id",
          valueType: "number",
          options: { dummyType: "autoincrement" },
        },
      },
    },
    {
      keyName: "user",
      valueType: "object",
      options: {
        object: [
          {
            keyName: "id",
            valueType: "number",
            options: { dummyType: "autoincrement" },
          },
          {
            keyName: "name",
            valueType: "string",
            options: { dummyType: "name", prefix: "", suffix: "" },
          },
          {
            keyName: "avatar",
            valueType: "string",
            options: { dummyType: "name", prefix: "", suffix: "" },
          },
        ],
      },
    },
  ],
};

export const JsonForm = () => {
  const methods = useRHForm<JsonCreateForm>({
    mode: "onBlur",
    defaultValues,
  });
  const { control, register, handleSubmit: onSubmit, reset } = methods;

  const onCreateJson = useCallback((data: JsonCreateForm) => {
    console.info(data);
  }, []);

  const onReset = useCallback(() => {
    reset(defaultValues);
  }, []);

  const onClear = useCallback(() => {
    reset({ object: [] });
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit(onCreateJson)}>
        <Group spacing="sm" align="start" grow sx={{ height: "calc(100vh - 100px)" }}>
          <Stack spacing="sm" sx={{ height: "100%" }}>
            <Group spacing="sm" position="left">
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

          <JsonGeneratorWatch type="array" length={3} control={control}>
            {(json: string) => (
              <Stack spacing="sm" sx={{ height: "100%" }}>
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
        </Group>
      </form>
    </FormProvider>
  );
};
