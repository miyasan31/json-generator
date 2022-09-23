import { ActionIcon, Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons";
import type { FC } from "react";
import React, { Fragment, useCallback } from "react";
import { Controller, useFieldArray } from "react-hook-form";

import { ArrayFormField } from "~/components/feature/form/field/ArrayFormField";
import { BooleanFormField } from "~/components/feature/form/field/BooleanFormField";
import { NumberFormField } from "~/components/feature/form/field/NumberFormField";
import { StringFormField } from "~/components/feature/form/field/StringFormField";
import { FormTypeWatch } from "~/components/feature/form/watcher/FormTypeWatch";
import { Divider } from "~/components/shared/Divider";
import { objectValueTypeOption } from "~/constants/form/selectOption";

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
          <Fragment key={item.id}>
            <Stack spacing="xs">
              <Group spacing="xs" align="end">
                <ActionIcon mb={1} component="button" onClick={() => onRemove(index)}>
                  <IconX size={16} />
                </ActionIcon>

                <TextInput size="xs" label="key" {...register(`${name}.${index}.keyName`)} />

                <Controller
                  control={control}
                  name={`${name}.${index}.valueType`}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select size="xs" label="value" value={value} onChange={onChange} data={objectValueTypeOption} />
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

            <Divider />
          </Fragment>
        );
      })}

      <Button size="xs" type="button" color="red" variant="outline" onClick={onAppend}>
        Add key
      </Button>
    </Stack>
  );
};
