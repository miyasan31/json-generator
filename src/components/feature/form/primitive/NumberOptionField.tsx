import { Group, NumberInput } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { Controller } from "react-hook-form";

import { useCreateJsonFormContext } from "~/components/page/public/Root/Root.page";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type NumberOptionFieldProps = {
  name: {
    numberDummyType: FilterFieldPath<FieldPath<ICreateJson>, "numberDummyType">;
    options: FilterFieldPath<FieldPath<ICreateJson>, "numberOptions">;
  };
};

export const NumberOptionField: FC<NumberOptionFieldProps> = ({ name }) => {
  const { control } = useCreateJsonFormContext();
  const numberDummyType = useWatch({ name: name.numberDummyType, control });

  if (["random", "age", "height", "weight", "price"].includes(numberDummyType)) {
    return (
      <Group spacing="xs" grow align="flex-start">
        <Controller
          name={`${name.options}.min`}
          control={control}
          render={({ field: { onChange, value } }) => {
            return <NumberInput min={0} size="xs" label="最小値" value={value} onChange={onChange} />;
          }}
        />

        <Controller
          control={control}
          name={`${name.options}.max`}
          render={({ field: { onChange, value } }) => {
            return <NumberInput max={10000} size="xs" label="最大値" value={value} onChange={onChange} />;
          }}
        />
      </Group>
    );
  }

  if (numberDummyType === "any") {
    return (
      <Controller
        control={control}
        name={`${name.options}.numberAnyValue`}
        render={({ field: { onChange, value } }) => {
          return <NumberInput size="xs" label="任意" value={value} onChange={onChange} />;
        }}
      />
    );
  }

  return null;
};
