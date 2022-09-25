import { ActionIcon, Button, Group, Select, Stack, TextInput, Tooltip } from "@mantine/core";
import { IconChevronUp, IconX } from "@tabler/icons";
import type { FC } from "react";
import { Fragment, useCallback } from "react";
import type { Control, UseFormRegister } from "react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";

import { ArrayFormField } from "~/components/feature/form/ArrayFormField";
import { BooleanFormField } from "~/components/feature/form/BooleanFormField";
import { NumberFormField } from "~/components/feature/form/NumberFormField";
import { ObjectFormField } from "~/components/feature/form/ObjectFormField";
import { StringFormField } from "~/components/feature/form/StringFormField";
import { FormTypeWatch } from "~/components/feature/form/watcher/FormTypeWatch";
import { Divider } from "~/components/shared/Divider";
import { appendValue } from "~/constants/form/appendValue";
import { objectValueTypeOption } from "~/constants/form/selectOption";
import type { JsonCreateForm } from "~/interfaces/model/form";
import type { ValueType } from "~/interfaces/model/object";

type Props = {
  control: Control<JsonCreateForm>;
  register: UseFormRegister<JsonCreateForm>;
  border?: boolean;
};

export const JsonFormField: FC<Props> = ({ control, register, border = true }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: "json",
  });

  const onRemove = useCallback((index: number) => remove(index), [remove]);
  const onAppend = useCallback(
    () =>
      append({
        keyName: "",
        valueType: "string",
        options: {
          stringDummyType: "name",
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
        marginTop: theme.spacing.xs,
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
                  {...register(`json.${index}.keyName`, {
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
                  name={`json.${index}`}
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

              <FormTypeWatch name={`json.${index}.valueType`} control={control}>
                {(value) => {
                  if (value === "string") {
                    return (
                      <StringFormField
                        name={{
                          stringDummyType: `json.${index}.options.stringDummyType`,
                          prefix: `json.${index}.options.prefix`,
                          suffix: `json.${index}.options.suffix`,
                        }}
                      />
                    );
                  }

                  if (value === "number") {
                    return <NumberFormField name={{ numberDummy: `json.${index}.options.numberDummyType` }} />;
                  }

                  if (value === "boolean") {
                    return (
                      <BooleanFormField
                        name={{
                          booleanDummy: `json.${index}.options.booleanDummyType`,
                        }}
                      />
                    );
                  }

                  if (value === "object") {
                    return (
                      <ObjectFormField register={register} control={control} name={`json.${index}.options.nest`} />
                    );
                  }

                  if (value === "array") {
                    return (
                      <ArrayFormField
                        name={{
                          item: `json.${index}.options.item`,
                          length: `json.${index}.options.length`,
                        }}
                      />
                    );
                  }
                }}
              </FormTypeWatch>
            </Stack>

            <Divider />
          </Fragment>
        );
      })}

      <Button size="xs" mt="xs" type="button" color="red" variant="outline" onClick={onAppend}>
        Add key
      </Button>
    </Stack>
  );
};
