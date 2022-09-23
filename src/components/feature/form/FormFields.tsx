import { ActionIcon, Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons";
import type { FC } from "react";
import React, { useCallback } from "react";
import { Controller, useFieldArray } from "react-hook-form";

import { ArrayFormField } from "~/components/feature/form/field/ArrayFormField";
import { BooleanFormField } from "~/components/feature/form/field/BooleanFormField";
import { NumberFormField } from "~/components/feature/form/field/NumberFormField";
import { ObjectFormField } from "~/components/feature/form/field/ObjectFormField";
import { StringFormField } from "~/components/feature/form/field/StringFormField";
import { FormTypeWatch } from "~/components/feature/form/watcher/FormTypeWatch";
import { Divider } from "~/components/shared/Divider";

type Props = {
  control: any;
  register: any;
};

export const FormFields: FC<Props> = ({ control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: "object",
  });

  const onRemove = useCallback((index: number) => remove(index), [remove]);
  const onAppend = useCallback(() => append({ keyName: "", valueType: "", options: {} }), [append]);

  return (
    <Stack
      spacing="xs"
      sx={(theme) => ({
        padding: theme.spacing.md,
      })}
    >
      {fields.map((item, index) => {
        return (
          <>
            <Stack spacing="xs" key={item.id}>
              <Group spacing="xs" align="end">
                <ActionIcon mb={1} component="button" onClick={() => onRemove(index)}>
                  <IconX size={16} />
                </ActionIcon>

                <TextInput size="xs" label="key" {...register(`object.${index}.keyName`)} />

                <Controller
                  control={control}
                  name={`object.${index}.valueType`}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        size="xs"
                        label="value"
                        value={value}
                        onChange={onChange}
                        data={[
                          { value: "string", label: "string" },
                          { value: "number", label: "number" },
                          { value: "boolean", label: "boolean" },
                          { value: "array", label: "array" },
                          { value: "object", label: "object" },
                        ]}
                      />
                    );
                  }}
                />
              </Group>

              <FormTypeWatch name={`object.${index}.valueType`} control={control}>
                {(value) => {
                  if (value === "string") {
                    return <StringFormField name={`object.${index}`} />;
                  }
                  if (value === "number") {
                    return <NumberFormField name={`object.${index}`} />;
                  }
                  if (value === "boolean") {
                    return <BooleanFormField name={`object.${index}`} />;
                  }
                  if (value === "object") {
                    return (
                      <ObjectFormField register={register} control={control} name={`object.${index}.options.object`} />
                    );
                  }
                  if (value === "array") {
                    return <ArrayFormField name={`object.${index}`} />;
                  }
                }}
              </FormTypeWatch>
            </Stack>

            <Divider />
          </>
        );
      })}

      <Button size="xs" type="button" color="red" variant="outline" onClick={onAppend}>
        Add key
      </Button>
    </Stack>
  );
};
