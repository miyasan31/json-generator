import { ActionIcon, Button, Group, Select, Stack, TextInput, Tooltip } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconX } from "@tabler/icons";
import type { FC } from "react";
import { Fragment, useCallback } from "react";
import type { Control, UseFormRegister } from "react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";

import { BooleanFormField } from "~/components/feature/form/field/BooleanFormField";
import { NumberFormField } from "~/components/feature/form/field/NumberFormField";
import { StringFormField } from "~/components/feature/form/field/StringFormField";
import { FormTypeWatcher } from "~/components/feature/form/watcher/FormTypeWatcher";
import { OptionVisibleWatcher } from "~/components/feature/form/watcher/OptionVisibleWatcher";
import { Divider } from "~/components/shared/Divider";
import { appendValue } from "~/constants/form/appendValue";
import { objectValueTypeOption } from "~/constants/form/selectOption";
import type { ObjectValueType } from "~/interfaces/model/object";
import type { ICreateJson } from "~/interfaces/useCase/json";

type Props = {
  name: `json.${number}.options.object.${number}.options.object` | `json.${number}.options.item.options.object`;
  control: Control<ICreateJson>;
  register: UseFormRegister<ICreateJson>;
  border?: boolean;
};

export const FirstNestObjectFormField: FC<Props> = ({ name, control, register, border = true }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name,
  });

  const onRemove = useCallback((index: number) => remove(index), [remove]);
  const onAppend = useCallback(
    () =>
      append({
        keyName: "",
        valueType: "string",
        options: {
          stringDummyType: "autoIncrement",
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
          <OptionVisibleWatcher key={item.id}>
            {(isVisible, onToggle) => (
              <>
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
                        const onChangeValue = (changeValue: ObjectValueType) => {
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
                            data={objectValueTypeOption.slice(0, 3)}
                            sx={{
                              flex: 1,
                            }}
                          />
                        );
                      }}
                    />

                    <Tooltip label="option" position="top-start">
                      <ActionIcon mb={1} component="button" onClick={onToggle}>
                        {isVisible ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                      </ActionIcon>
                    </Tooltip>

                    <Tooltip label="delete" position="top-start">
                      <ActionIcon mb={1} component="button" onClick={() => onRemove(index)}>
                        <IconX size={16} color="red" />
                      </ActionIcon>
                    </Tooltip>
                  </Group>

                  {isVisible ? (
                    <FormTypeWatcher name={`${name}.${index}.valueType`} control={control}>
                      {(value) => {
                        if (value === "string") {
                          return (
                            <StringFormField
                              name={{
                                stringDummyType: `${name}.${index}.options.stringDummyType`,
                                prefix: `${name}.${index}.options.prefix`,
                                suffix: `${name}.${index}.options.suffix`,
                              }}
                            />
                          );
                        }

                        if (value === "number") {
                          return (
                            <NumberFormField
                              name={{
                                numberDummy: `${name}.${index}.options.numberDummyType`,
                              }}
                            />
                          );
                        }

                        if (value === "boolean") {
                          return (
                            <BooleanFormField
                              name={{
                                booleanDummy: `${name}.${index}.options.booleanDummyType`,
                              }}
                            />
                          );
                        }
                      }}
                    </FormTypeWatcher>
                  ) : null}
                </Stack>

                <Divider />
              </>
            )}
          </OptionVisibleWatcher>
        );
      })}

      <Button size="xs" mt="xs" type="button" color="red" variant="outline" onClick={onAppend}>
        Add key
      </Button>
    </Stack>
  );
};
