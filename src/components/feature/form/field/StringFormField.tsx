import { Group, Select, TextInput } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

import { stringDummyTypeOption } from "~/constants/form/selectOption";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type Props = {
  name: {
    stringDummyType: FilterFieldPath<FieldPath<ICreateJson>, "stringDummyType">;
    prefix: FilterFieldPath<FieldPath<ICreateJson>, "prefix">;
    suffix: FilterFieldPath<FieldPath<ICreateJson>, "suffix">;
  };
};

export const StringFormField: FC<Props> = ({ name }) => {
  const { register, control } = useFormContext<ICreateJson>();

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
