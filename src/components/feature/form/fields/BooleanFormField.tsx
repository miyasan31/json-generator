import { Group, Select } from "@mantine/core";
import type { FC } from "react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  leftSpace?: boolean;
};

export const BooleanFormField: FC<Props> = ({ name, leftSpace = true }) => {
  const { control } = useFormContext();

  return (
    <Group spacing="xs" align="end" ml={leftSpace ? "2.375rem" : 0}>
      <Controller
        control={control}
        name={`${name}.options.dummyType`}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              size="xs"
              label="dummy type"
              value={value}
              onChange={onChange}
              data={[
                { value: "true", label: "true" },
                { value: "false", label: "false" },
                { value: "random", label: "Random" },
              ]}
            />
          );
        }}
      />
    </Group>
  );
};
