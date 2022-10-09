import { Select } from "@mantine/core";
import type { FC } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

import { appendValue } from "~/constants/form/appendValue";
import type { ArrayValueTypeOption, ObjectValueType, ObjectValueTypeOption } from "~/interfaces/model/object";
import type { ICreateJson } from "~/interfaces/useCase/json";

type FormTypeFieldProps = {
  control: Control<ICreateJson>;
  name:
    | `json.${number}`
    | `json.${number}.item`
    | `json.${number}.object.${number}`
    | `json.${number}.object.${number}.item`
    | `json.${number}.object.${number}.object.${number}`
    | `json.${number}.item.object.${number}`;
  data: ObjectValueTypeOption[] | ArrayValueTypeOption[];
};

export const FormTypeField: FC<FormTypeFieldProps> = ({ data, control, name }) => {
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
