import { Button, Group, Stack } from "@mantine/core";
import { useCallback } from "react";
import { FormProvider } from "react-hook-form";

import { FormFields } from "~/components/feature/form/FormFields";
import type { JsonCreateForm } from "~/components/feature/form/From.interface";
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
  }, [reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit(onCreateJson)}>
        <Stack spacing="sm">
          <Group spacing="sm" position="right">
            <Button type="button" variant="default" onClick={onReset}>
              Reset
            </Button>

            <Button type="submit">Generate</Button>
          </Group>

          <FormFields {...{ control, register }} />
        </Stack>
      </form>
    </FormProvider>
  );
};
