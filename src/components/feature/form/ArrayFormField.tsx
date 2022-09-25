import { Group, NumberInput, Select, Stack } from "@mantine/core";
import type { FC } from "react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { BooleanFormField } from "~/components/feature/form/BooleanFormField";
import { NumberFormField } from "~/components/feature/form/NumberFormField";
import { ObjectFormField } from "~/components/feature/form/ObjectFormField";
import { StringFormField } from "~/components/feature/form/StringFormField";
import { ArrayTypeWatch } from "~/components/feature/form/watcher/ArrayTypeWatch";
import { appendValue } from "~/constants/form/appendValue";
import { arrayValueTypeOption } from "~/constants/form/selectOption";
import type { ValueType } from "~/interfaces/model/Form.interface";

type Props = {
  name: string;
};

export const ArrayFormField: FC<Props> = ({ name }) => {
  const { register, control } = useFormContext();

  return (
    <Stack
      spacing="xs"
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        padding: theme.spacing.lg,
        backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[7],
        border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[3] : theme.colors.dark[5]}`,
      })}
    >
      <Group spacing="xs" align="end">
        <Controller
          control={control}
          name={`${name}.options.length`}
          render={({ field: { onChange, value } }) => {
            return (
              <NumberInput
                defaultValue={5}
                min={1}
                max={100}
                size="xs"
                label="length"
                value={value}
                onChange={onChange}
              />
            );
          }}
        />

        <Controller
          control={control}
          name={`${name}.options.item`}
          render={({ field: { onChange, value } }) => {
            const onChangeValue = (changeValue: ValueType) => {
              onChange({
                ...value,
                keyName: value.keyName,
                valueType: changeValue,
                options: appendValue[changeValue],
              });
            };
            return (
              <Select
                size="xs"
                label="value"
                value={value.valueType}
                onChange={onChangeValue}
                data={arrayValueTypeOption}
              />
            );
          }}
        />
      </Group>

      <ArrayTypeWatch name={`${name}.options.item.valueType`} control={control}>
        {(value) => {
          if (value === "string") {
            return <StringFormField name={`${name}.options.item`} />;
          }
          if (value === "number") {
            return <NumberFormField name={`${name}.options.item`} />;
          }
          if (value === "boolean") {
            return <BooleanFormField name={`${name}.options.item`} />;
          }
          if (value === "object") {
            return (
              <ObjectFormField register={register} control={control} name={`${name}.options.item.options.object`} />
            );
          }
        }}
      </ArrayTypeWatch>
    </Stack>
  );
};
