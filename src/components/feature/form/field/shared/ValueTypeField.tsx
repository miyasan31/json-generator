import { Select } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { Controller } from "react-hook-form";

import { useCreateJsonFormContext } from "~/components/page/public/Root/Root.page";
import { appendValue } from "~/constants/form/appendValue";
import type { ArrayValueTypeOption, ObjectValueType, ObjectValueTypeOption } from "~/interfaces/model/object";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type RootObjectField = FilterFieldPath<FieldPath<ICreateJson>, `${number}`>;
type NestObjectField = FilterFieldPath<FieldPath<ICreateJson>, `object.${number}`>;
type NestArrayField = FilterFieldPath<FieldPath<ICreateJson>, "item">;
type Fields = RootObjectField | NestArrayField | NestObjectField;

type ValueTypeFieldProps = {
  name: Fields;
  data: ObjectValueTypeOption[] | ArrayValueTypeOption[];
};

export const ValueTypeField: FC<ValueTypeFieldProps> = ({ data, name }) => {
  const { control } = useCreateJsonFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const onChangeValue = (changeValue: ObjectValueType) => {
          onChange({
            keyName: value.keyName,
            valueType: changeValue,
            ...appendValue[changeValue],
          });
        };
        return (
          <Select
            sx={{ flex: 1 }}
            size="xs"
            searchable
            label="型"
            value={value.valueType}
            onChange={onChangeValue}
            data={data}
          />
        );
      }}
    />
  );
};
