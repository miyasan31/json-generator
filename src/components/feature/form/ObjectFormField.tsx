import { ActionIcon, Button, Group, Select, Stack, TextInput, Tooltip } from "@mantine/core";
import { IconChevronUp, IconX } from "@tabler/icons";
import type { FC } from "react";
import React, { Fragment, useCallback } from "react";
import type { useFormContext } from "react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";

import { ArrayFormField } from "~/components/feature/form/ArrayFormField";
import { BooleanFormField } from "~/components/feature/form/BooleanFormField";
import { NumberFormField } from "~/components/feature/form/NumberFormField";
import { StringFormField } from "~/components/feature/form/StringFormField";
import { FormTypeWatch } from "~/components/feature/form/watcher/FormTypeWatch";
import { Divider } from "~/components/shared/Divider";
import { appendValue } from "~/constants/form/appendValue";
import { objectValueTypeOption } from "~/constants/form/selectOption";
import type { ValueType } from "~/interfaces/model/Form.interface";

type Props = {
  control: ReturnType<typeof useFormContext>["control"];
  register: ReturnType<typeof useFormContext>["register"];
  name: string;
  border?: boolean;
};

export const ObjectFormField: FC<Props> = ({ name, control, register, border = true }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `${name}`,
  });

  const onRemove = useCallback((index: number) => remove(index), [remove]);
  const onAppend = useCallback(
    () =>
      append({
        keyName: "",
        valueType: "string",
        options: {
          dummyType: "name",
          prefix: "",
          suffix: "",
        },
      }),
    [append],
  );

  return (
    <Stack
      spacing="xs"
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        padding: theme.spacing.lg,
        border: border
          ? `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[3] : theme.colors.dark[5]}`
          : "",
      })}
    >
      {fields.map((item, index) => {
        return (
          <Fragment key={item.id}>
            <Stack spacing="xs">
              <Group spacing="xs" align="end">
                <TextInput
                  required
                  size="xs"
                  label="key"
                  {...register(`${name}.${index}.keyName`, {
                    required: {
                      value: true,
                      message: "key is required",
                    },
                  })}
                  sx={{
                    flex: 2,
                  }}
                />

                <Controller
                  control={control}
                  name={`${name}.${index}`}
                  render={({ field: { onChange, value } }) => {
                    const onChangeValue = (changeValue: ValueType) => {
                      onChange({
                        ...value,
                        keyName: value.keyName,
                        valueType: changeValue,
                        options: appendValue[changeValue],
                      });
                    };
                    return (
                      <Select
                        size="xs"
                        label="value"
                        value={value.valueType}
                        onChange={onChangeValue}
                        data={objectValueTypeOption}
                        sx={{
                          flex: 1,
                        }}
                      />
                    );
                  }}
                />

                <Tooltip label="option" position="top-start">
                  <ActionIcon mb={1} component="button">
                    <IconChevronUp size={16} />
                    {/* {isVisible ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />} */}
                  </ActionIcon>
                </Tooltip>

                <Tooltip label="delete" position="top-start">
                  <ActionIcon mb={1} component="button" onClick={() => onRemove(index)}>
                    <IconX size={16} color="red" />
                  </ActionIcon>
                </Tooltip>
              </Group>

              <FormTypeWatch name={`${name}.${index}.valueType`} control={control}>
                {(value) => {
                  if (value === "string") {
                    return <StringFormField name={`${name}.${index}`} />;
                  }
                  if (value === "number") {
                    return <NumberFormField name={`${name}.${index}`} />;
                  }
                  if (value === "boolean") {
                    return <BooleanFormField name={`${name}.${index}`} />;
                  }
                  if (value === "object") {
                    return (
                      <ObjectFormField register={register} control={control} name={`${name}.${index}.options.object`} />
                    );
                  }
                  if (value === "array") {
                    return <ArrayFormField name={`${name}.${index}`} />;
                  }
                }}
              </FormTypeWatch>
            </Stack>

            <Divider />
          </Fragment>
        );
      })}

      <Button size="xs" type="button" color="red" variant="outline" onClick={onAppend}>
        Add key
      </Button>
    </Stack>
  );
};
