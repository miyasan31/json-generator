import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import type { FC } from "react";
import { useCallback } from "react";
import type { Control, UseFormRegister } from "react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";

import { DeleteButton } from "~/components/feature/form/DeleteButton";
import { BooleanTypeFormField } from "~/components/feature/form/field/BooleanTypeFormField";
import { FirstNestArrayOptionFormField } from "~/components/feature/form/field/FirstNestArrayOptionFormField";
import { NumberOptionFormField } from "~/components/feature/form/field/NumberOptionFormField";
import { NumberTypeFormField } from "~/components/feature/form/field/NumberTypeFormField";
import { StringOptionFormField } from "~/components/feature/form/field/StringOptionFormField";
import { StringTypeFormField } from "~/components/feature/form/field/StringTypeFormField";
import { OptionController } from "~/components/feature/form/OptionController";
import { OptionToggle } from "~/components/feature/form/OptionToggle";
import { FormTypeWatcher } from "~/components/feature/form/watcher/FormTypeWatcher";
import { Divider } from "~/components/shared/Divider";
import { appendValue } from "~/constants/form/appendValue";
import { formRules } from "~/constants/form/formRules";
import { addKeyLabel, keyNameLabel, valueTypeLabel } from "~/constants/form/label";
import { objectValueTypeOption } from "~/constants/form/selectOption";
import type { ObjectValueType } from "~/interfaces/model/object";
import type { ICreateJson } from "~/interfaces/useCase/json";

type Props = {
  name: `json.${number}.object`;
  control: Control<ICreateJson>;
  register: UseFormRegister<ICreateJson>;
  border?: boolean;
};

export const ObjectFormField: FC<Props> = ({ name, control, register, border = true }) => {
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
          <OptionController key={item.id} type={item.valueType}>
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
                            searchable
                            label={valueTypeLabel}
                            value={value.valueType}
                            onChange={onChangeValue}
                            data={objectValueTypeOption.slice(0, 4)}
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

                    <OptionToggle
                      isVisible={isVisible}
                      onToggle={onToggle}
                      control={control}
                      name={{
                        valueType: `${name}.${index}.valueType`,
                        stringDummyType: `${name}.${index}.stringDummyType`,
                        numberDummyType: `${name}.${index}.numberDummyType`,
                      }}
                    />

                    <DeleteButton index={index} onRemove={onRemove} />
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

                        if (value === "array") {
                          return (
                            <FirstNestArrayOptionFormField
                              name={{
                                length: `${name}.${index}.length`,
                                item: `${name}.${index}.item`,
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
          </OptionController>
        );
      })}

      <Button size="xs" mt="xs" type="button" color="red" variant="outline" onClick={onAppend}>
        {addKeyLabel}
      </Button>
    </Stack>
  );
};
