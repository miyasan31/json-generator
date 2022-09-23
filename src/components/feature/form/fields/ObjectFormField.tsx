import { ActionIcon, Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons";
import type { FC } from "react";
import React, { useCallback } from "react";
import { Controller, useFieldArray } from "react-hook-form";

import { ArrayFormField } from "~/components/feature/form/fields/ArrayFormField";
import { BooleanFormField } from "~/components/feature/form/fields/BooleanFormField";
import { FormTypeWatch } from "~/components/feature/form/fields/FormTypeWatch";
import { NumberFormField } from "~/components/feature/form/fields/NumberFormField";
import { StringFormField } from "~/components/feature/form/fields/StringFormField";

type Props = {
  control: any;
  register: any;
  name: string;
  leftSpace?: boolean;
};

export const ObjectFormField: FC<Props> = ({ name, control, register, leftSpace = true }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `${name}`,
  });

  const onRemove = useCallback((index: number) => remove(index), [remove]);
  const onAppend = useCallback(() => append({ keyName: "", valueType: "", options: {} }), [append]);

  return (
    <Stack
      spacing="xs"
      ml={leftSpace ? "2.375rem" : 0}
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        padding: theme.spacing.sm,
        backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[7],
        border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[3] : theme.colors.dark[5]}`,
      })}
    >
      {fields.map((item, index) => {
        return (
          <Stack spacing="xs" key={item.id}>
            <Group spacing="xs" align="end">
              <ActionIcon mb={1}>
                <IconX size={16} onClick={() => onRemove(index)} />
              </ActionIcon>

              <TextInput size="xs" label="key" {...register(`${name}.${index}.keyName`)} />

              <Controller
                control={control}
                name={`${name}.${index}.valueType`}
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

            <FormTypeWatch name={`${name}.${index}.valueType`} control={control}>
              {(value) => {
                if (value === "string") {
                  return <StringFormField name={`${name}.${index}`} />;
                }
                if (value === "number") {
                  return <NumberFormField name={`${name}.${index}`} />;
                }
                if (value === "boolean") {
                  return <BooleanFormField name={`${name}.${index}`} />;
                }
                if (value === "object") {
                  return (
                    <ObjectFormField register={register} control={control} name={`${name}.${index}.options.object`} />
                  );
                }
                if (value === "array") {
                  return <ArrayFormField name={`${name}.${index}`} />;
                }
              }}
            </FormTypeWatch>
          </Stack>
        );
      })}

      <Button size="xs" type="button" color="red" variant="outline" onClick={onAppend}>
        Add key
      </Button>
    </Stack>
  );
};
