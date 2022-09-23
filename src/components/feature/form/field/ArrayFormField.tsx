import { Group, NumberInput, Select, Stack } from "@mantine/core";
import type { FC } from "react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { BooleanFormField } from "~/components/feature/form/field/BooleanFormField";
import { NumberFormField } from "~/components/feature/form/field/NumberFormField";
import { ObjectFormField } from "~/components/feature/form/field/ObjectFormField";
import { StringFormField } from "~/components/feature/form/field/StringFormField";
import { FormTypeWatch } from "~/components/feature/form/watcher/FormTypeWatch";
import { arrayValueTypeOption } from "~/constants/form/selectOption";

type Props = {
  name: string;
};

export const ArrayFormField: FC<Props> = ({ name }) => {
  const { register, control } = useFormContext();

  return (
    <Stack
      spacing="xs"
      ml="2.375rem"
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        padding: theme.spacing.sm,
        backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[7],
        border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[3] : theme.colors.dark[5]}`,
      })}
    >
      <Group spacing="xs" align="end">
        <Controller
          control={control}
          name={`${name}.options.length`}
          render={({ field: { onChange, value } }) => {
            return <NumberInput defaultValue={5} size="xs" label="length" value={value} onChange={onChange} />;
          }}
        />

        <Controller
          control={control}
          name={`${name}.options.item.valueType`}
          render={({ field: { onChange, value } }) => {
            return <Select size="xs" label="value" value={value} onChange={onChange} data={arrayValueTypeOption} />;
          }}
        />
      </Group>

      <FormTypeWatch name={`${name}.options.item.valueType`} control={control}>
        {(value) => {
          if (value === "string") {
            return <StringFormField leftSpace={false} name={`${name}.options.item`} />;
          }
          if (value === "number") {
            return <NumberFormField leftSpace={false} name={`${name}.options.item`} />;
          }
          if (value === "boolean") {
            return <BooleanFormField leftSpace={false} name={`${name}.options.item`} />;
          }
          if (value === "object") {
            return (
              <ObjectFormField
                leftSpace={false}
                register={register}
                control={control}
                name={`${name}.options.item.options.object`}
              />
            );
          }
        }}
      </FormTypeWatch>
    </Stack>
  );
};
