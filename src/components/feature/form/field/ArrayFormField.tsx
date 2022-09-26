import { Group, NumberInput, Select, Stack } from "@mantine/core";
import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { BooleanFormField } from "~/components/feature/form/field/BooleanFormField";
import { FirstNestObjectFormField } from "~/components/feature/form/field/FirstNestObjectFormField";
import { NumberFormField } from "~/components/feature/form/field/NumberFormField";
import { StringFormField } from "~/components/feature/form/field/StringFormField";
import { ArrayTypeWatcher } from "~/components/feature/form/watcher/ArrayTypeWatcher";
import { appendValue } from "~/constants/form/appendValue";
import { arrayValueTypeOption } from "~/constants/form/selectOption";
import type { ObjectValueType } from "~/interfaces/model/object";
import type { ICreateJson } from "~/interfaces/useCase/json";

type Props = {
  name: {
    item: `json.${number}.options.item`;
    length: `json.${number}.options.length`;
  };
};

export const ArrayFormField: FC<Props> = ({ name }) => {
  const { register, control } = useFormContext<ICreateJson>();

  return (
    <Stack
      spacing="xs"
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        padding: theme.spacing.lg,
        marginTop: theme.spacing.xs,
        backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[7],
        border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[3] : theme.colors.dark[5]}`,
      })}
    >
      <Group spacing="xs" align="end">
        <Controller
          control={control}
          name={`${name.length}`}
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
          name={`${name.item}`}
          render={({ field: { onChange, value } }) => {
            const onChangeValue = (changeValue: ObjectValueType) => {
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

      <ArrayTypeWatcher name={`${name.item}.valueType`} control={control}>
        {(value) => {
          if (value === "string") {
            return (
              <StringFormField
                name={{
                  stringDummyType: `${name.item}.options.stringDummyType`,
                  prefix: `${name.item}.options.prefix`,
                  suffix: `${name.item}.options.suffix`,
                }}
              />
            );
          }

          if (value === "number") {
            return (
              <NumberFormField
                name={{
                  numberDummy: `${name.item}.options.numberDummyType`,
                }}
              />
            );
          }

          if (value === "boolean") {
            return (
              <BooleanFormField
                name={{
                  booleanDummy: `${name.item}.options.booleanDummyType`,
                }}
              />
            );
          }

          if (value === "object") {
            return (
              <FirstNestObjectFormField register={register} control={control} name={`${name.item}.options.object`} />
            );
          }
        }}
      </ArrayTypeWatcher>
    </Stack>
  );
};
