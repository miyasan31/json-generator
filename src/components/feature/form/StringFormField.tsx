import { Group, Select, TextInput } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

import { stringDummyTypeOption } from "~/constants/form/selectOption";
import type { JsonCreateForm } from "~/interfaces/model/form";

type FilterFieldPath<FieldPaths, FilterString extends string> = FieldPaths extends `${infer T}.${FilterString}`
  ? `${T}.${FilterString}`
  : never;

type FieldNames = FieldPath<JsonCreateForm>;

type Props = {
  name: {
    stringDummyType: FilterFieldPath<FieldNames, "stringDummyType">;
    prefix: FilterFieldPath<FieldNames, "prefix">;
    suffix: FilterFieldPath<FieldNames, "suffix">;
  };
};

export const StringFormField: FC<Props> = ({ name }) => {
  const { register, control } = useFormContext<JsonCreateForm>();

  return (
    <Group spacing="xs" align="end">
      <Controller
        control={control}
        name={name.stringDummyType}
        render={({ field: { onChange, value } }) => {
          return <Select size="xs" label="dummy type" value={value} onChange={onChange} data={stringDummyTypeOption} />;
        }}
      />
      <TextInput size="xs" label="prefix" {...register(name.prefix)} />
      <TextInput size="xs" label="suffix" {...register(name.suffix)} />
    </Group>
  );
};
