import { ActionIcon, Button, Group, Select, Space, Stack, TextInput, Tooltip } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconX } from "@tabler/icons";
import type { FC } from "react";
import { useCallback } from "react";
import type { Control, UseFormRegister } from "react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";

import { BooleanTypeFormField } from "~/components/feature/form/field/BooleanTypeFormField";
import { NumberOptionFormField } from "~/components/feature/form/field/NumberOptionFormField";
import { NumberTypeFormField } from "~/components/feature/form/field/NumberTypeFormField";
import { StringOptionFormField } from "~/components/feature/form/field/StringOptionFormField";
import { StringTypeFormField } from "~/components/feature/form/field/StringTypeFormField";
import { FormTypeWatcher } from "~/components/feature/form/watcher/FormTypeWatcher";
import { OptionVisibleWatcher } from "~/components/feature/form/watcher/OptionVisibleWatcher";
import { OptionWatcher } from "~/components/feature/form/watcher/OptionWatcher";
import { Divider } from "~/components/shared/Divider";
import { appendValue } from "~/constants/form/appendValue";
import { formRules } from "~/constants/form/formRules";
import { addKeyLabel, deleteTooltipLabel, keyNameLabel, valueTypeLabel } from "~/constants/form/label";
import { objectValueTypeOption } from "~/constants/form/selectOption";
import type { ObjectValueType } from "~/interfaces/model/object";
import type { ICreateJson } from "~/interfaces/useCase/json";

type FirstNestObjectFormFieldProps = {
  name: `json.${number}.item.object` | `json.${number}.object.${number}.object`;
  control: Control<ICreateJson>;
  register: UseFormRegister<ICreateJson>;
  border?: boolean;
};

export const FirstNestObjectFormField: FC<FirstNestObjectFormFieldProps> = ({
  name,
  control,
  register,
  border = true,
}) => {
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
        stringDummyType: "autoIncrement",
        stringOptions: {
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
          <OptionVisibleWatcher key={item.id} type={item.valueType}>
            {(isVisible, onToggle) => (
              <>
                <Stack spacing="xs">
                  <Group spacing="xs" align="flex-start">
                    <TextInput
                      required
                      size="xs"
                      label={keyNameLabel}
                      {...register(`${name}.${index}.keyName`, formRules.keyName)}
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
                            keyName: value.keyName,
                            valueType: changeValue,
                            ...appendValue[changeValue],
                          });
                        };
                        return (
                          <Select
                            size="xs"
                            label={valueTypeLabel}
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

                    <FormTypeWatcher name={`${name}.${index}.valueType`} control={control}>
                      {(value) => {
                        if (value === "string") {
                          return <StringTypeFormField name={`${name}.${index}.stringDummyType`} />;
                        }
                        if (value === "number") {
                          return <NumberTypeFormField name={`${name}.${index}.numberDummyType`} />;
                        }
                        if (value === "boolean") {
                          return <BooleanTypeFormField name={`${name}.${index}.booleanDummyType`} />;
                        }
                      }}
                    </FormTypeWatcher>

                    <OptionWatcher
                      name={{
                        valueType: `${name}.${index}.valueType`,
                        stringDummyType: `${name}.${index}.stringDummyType`,
                        numberDummyType: `${name}.${index}.numberDummyType`,
                      }}
                      control={control}
                    >
                      {(isOptionVisible) => {
                        if (!isOptionVisible) return <Space w={28} />;
                        return (
                          <ActionIcon mt={26} component="button" onClick={onToggle}>
                            {isVisible ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                          </ActionIcon>
                        );
                      }}
                    </OptionWatcher>

                    <Tooltip label={deleteTooltipLabel} position="top-start">
                      <ActionIcon mt={26} component="button" onClick={() => onRemove(index)}>
                        <IconX size={16} color="red" />
                      </ActionIcon>
                    </Tooltip>
                  </Group>

                  {isVisible ? (
                    <FormTypeWatcher name={`${name}.${index}.valueType`} control={control}>
                      {(value) => {
                        if (value === "string") {
                          return (
                            <StringOptionFormField
                              name={{
                                stringDummyType: `${name}.${index}.stringDummyType`,
                                options: `${name}.${index}.stringOptions`,
                              }}
                            />
                          );
                        }

                        if (value === "number") {
                          return (
                            <NumberOptionFormField
                              name={{
                                numberDummyType: `${name}.${index}.numberDummyType`,
                                options: `${name}.${index}.numberOptions`,
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
        {addKeyLabel}
      </Button>
    </Stack>
  );
};
