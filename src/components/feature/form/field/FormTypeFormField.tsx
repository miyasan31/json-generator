import { Select } from "@mantine/core";
import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { appendValue } from "~/constants/form/appendValue";
import { valueTypeLabel } from "~/constants/form/label";
import type { ArrayValueTypeOption, ObjectValueType, ObjectValueTypeOption } from "~/interfaces/model/object";
import type { ICreateJson } from "~/interfaces/useCase/json";

type FormTypeFormFieldProps = {
  name:
    | `json.${number}`
    | `json.${number}.item`
    | `json.${number}.object.${number}`
    | `json.${number}.object.${number}.item`
    | `json.${number}.object.${number}.object.${number}`
    | `json.${number}.item.object.${number}`;
  data: ObjectValueTypeOption[] | ArrayValueTypeOption[];
};

export const FormTypeFormField: FC<FormTypeFormFieldProps> = ({ data, name }) => {
  const { control } = useFormContext<ICreateJson>();

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
            size="xs"
            searchable
            label={valueTypeLabel}
            value={value.valueType}
            onChange={onChangeValue}
            data={data}
            sx={{
              flex: 1,
            }}
          />
        );
      }}
    />
  );
};
