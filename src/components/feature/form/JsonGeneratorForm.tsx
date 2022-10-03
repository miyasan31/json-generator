import { ActionIcon, Button, Group, Select, Space, Stack, TextInput, Tooltip } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconX } from "@tabler/icons";
import type { FC } from "react";
import { useCallback } from "react";
import type { Control, UseFormRegister } from "react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";

import { ArrayOptionFormField } from "~/components/feature/form/field/ArrayOptionFormField";
import { BooleanTypeFormField } from "~/components/feature/form/field/BooleanTypeFormField";
import { NumberOptionFormField } from "~/components/feature/form/field/NumberOptionFormField";
import { NumberTypeFormField } from "~/components/feature/form/field/NumberTypeFormField";
import { ObjectFormField } from "~/components/feature/form/field/ObjectFormField";
import { StringOptionFormField } from "~/components/feature/form/field/StringOptionFormField";
import { StringTypeFormField } from "~/components/feature/form/field/StringTypeFormField";
import { FormTypeWatcher } from "~/components/feature/form/watcher/FormTypeWatcher";
import { OptionVisibleWatcher } from "~/components/feature/form/watcher/OptionVisibleWatcher";
import { OptionWatcher } from "~/components/feature/form/watcher/OptionWatcher";
import { Divider } from "~/components/shared/Divider";
import { appendValue } from "~/constants/form/appendValue";
import { addKeyLabel, deleteTooltipLabel, keyNameLabel, valueTypeLabel } from "~/constants/form/label";
import { objectValueTypeOption } from "~/constants/form/selectOption";
import type { ObjectValueType } from "~/interfaces/model/object";
import type { ICreateJson } from "~/interfaces/useCase/json";

type JsonGeneratorFormProps = {
  control: Control<ICreateJson>;
  register: UseFormRegister<ICreateJson>;
  border?: boolean;
};

export const JsonGeneratorForm: FC<JsonGeneratorFormProps> = ({ control, register, border = true }) => {
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
                  <Group spacing="xs" align="end">
                    <TextInput
                      required
                      size="xs"
                      label={keyNameLabel}
                      {...register(`json.${index}.keyName`)}
                      sx={{
                        flex: 2,
                      }}
                    />

                    <Controller
                      control={control}
                      name={`json.${index}`}
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
                            data={objectValueTypeOption}
                            sx={{
                              flex: 1,
                            }}
                          />
                        );
                      }}
                    />

                    <FormTypeWatcher name={`json.${index}.valueType`} control={control}>
                      {(value) => {
                        if (value === "string") {
                          return <StringTypeFormField name={`json.${index}.stringDummyType`} />;
                        }
                        if (value === "number") {
                          return <NumberTypeFormField name={`json.${index}.numberDummyType`} />;
                        }
                        if (value === "boolean") {
                          return <BooleanTypeFormField name={`json.${index}.booleanDummyType`} />;
                        }
                      }}
                    </FormTypeWatcher>

                    <OptionWatcher
                      name={{
                        valueType: `json.${index}.valueType`,
                        stringDummyType: `json.${index}.stringDummyType`,
                        numberDummyType: `json.${index}.numberDummyType`,
                      }}
                      control={control}
                    >
                      {(isOptionVisible) => {
                        if (!isOptionVisible) return <Space w={28} />;
                        return (
                          <ActionIcon mb={1} component="button" onClick={onToggle}>
                            {isVisible ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                          </ActionIcon>
                        );
                      }}
                    </OptionWatcher>

                    <Tooltip label={deleteTooltipLabel} position="top-start">
                      <ActionIcon mb={1} component="button" onClick={() => onRemove(index)}>
                        <IconX size={16} color="red" />
                      </ActionIcon>
                    </Tooltip>
                  </Group>

                  {isVisible ? (
                    <FormTypeWatcher name={`json.${index}.valueType`} control={control}>
                      {(value) => {
                        if (value === "string") {
                          return (
                            <StringOptionFormField
                              name={{
                                stringDummyType: `json.${index}.stringDummyType`,
                                options: `json.${index}.stringOptions`,
                              }}
                            />
                          );
                        }

                        if (value === "number") {
                          return (
                            <NumberOptionFormField
                              name={{
                                numberDummyType: `json.${index}.numberDummyType`,
                                options: `json.${index}.numberOptions`,
                              }}
                            />
                          );
                        }

                        if (value === "array") {
                          return (
                            <ArrayOptionFormField
                              name={{
                                length: `json.${index}.length`,
                                item: `json.${index}.item`,
                              }}
                            />
                          );
                        }

                        if (value === "object") {
                          return (
                            <ObjectFormField register={register} control={control} name={`json.${index}.object`} />
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
