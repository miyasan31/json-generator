import { Group, Select } from "@mantine/core";
import type { FC } from "react";
import React from "react";
import type { FieldPath } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

import { booleanDummyTypeOption } from "~/constants/form/selectOption";
import type { JsonCreateForm } from "~/interfaces/model/form";

type FilterFieldPath<FieldPaths, FilterString extends string> = FieldPaths extends `${infer T}.${FilterString}`
  ? `${T}.${FilterString}`
  : never;

type FieldNames = FieldPath<JsonCreateForm>;

type Props = {
  name: {
    booleanDummy: FilterFieldPath<FieldNames, "booleanDummyType">;
  };
};

export const BooleanFormField: FC<Props> = ({ name }) => {
  const { control } = useFormContext<JsonCreateForm>();

  return (
    <Group spacing="xs" align="end">
      <Controller
        control={control}
        name={name.booleanDummy}
        render={({ field: { onChange, value } }) => {
          return (
            <Select size="xs" label="dummy type" value={value} onChange={onChange} data={booleanDummyTypeOption} />
          );
        }}
      />
    </Group>
  );
};
