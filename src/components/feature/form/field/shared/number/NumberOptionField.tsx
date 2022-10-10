import { NumberInput } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useWatch } from "react-hook-form";

import { NumberRangeOptionField } from "~/components/feature/form/field/shared/number/NumberRangeOptionField";
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

  if (numberDummyType === "random") {
    return <NumberRangeOptionField name={{ options: name.options }} />;
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
