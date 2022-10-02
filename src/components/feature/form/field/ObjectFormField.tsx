import { ActionIcon, Button, Group, Select, Space, Stack, TextInput, Tooltip } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconX } from "@tabler/icons";
import type { FC } from "react";
import { useCallback } from "react";
import type { Control, UseFormRegister } from "react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";

import { BooleanTypeFormField } from "~/components/feature/form/field/BooleanTypeFormField";
import { FirstNestArrayOptionFormField } from "~/components/feature/form/field/FirstNestArrayOptionFormField";
import { NumberOptionFormField } from "~/components/feature/form/field/NumberOptionFormField";
import { NumberTypeFormField } from "~/components/feature/form/field/NumberTypeFormField";
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
          <OptionVisibleWatcher key={item.id} type={item.valueType}>
            {(isVisible, onToggle) => (
              <>
                <Stack spacing="xs">
                  <Group spacing="xs" align="end">
                    <TextInput
                      required
                      size="xs"
                      label={keyNameLabel}
                      {...register(`${name}.${index}.keyName`)}
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
                            options: appendValue[changeValue],
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
                        switch (value) {
                          case "string":
                            return (
                              <>
                                <StringTypeFormField name={`json.${index}.stringDummyType`} />
                                <OptionWatcher type="string" name={`json.${index}.stringDummyType`} control={control}>
                                  {(isOptionVisible) => {
                                    if (!isOptionVisible) return <Space w={28} />;
                                    return (
                                      <ActionIcon mb={1} component="button" onClick={onToggle}>
                                        {isVisible ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                                      </ActionIcon>
                                    );
                                  }}
                                </OptionWatcher>
                              </>
                            );
                          case "number":
                            return (
                              <>
                                <NumberTypeFormField name={`json.${index}.numberDummyType`} />
                                <OptionWatcher type="number" name={`json.${index}.numberDummyType`} control={control}>
                                  {(isOptionVisible) => {
                                    if (!isOptionVisible) return <Space w={28} />;
                                    return (
                                      <ActionIcon mb={1} component="button" onClick={onToggle}>
                                        {isVisible ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                                      </ActionIcon>
                                    );
                                  }}
                                </OptionWatcher>
                              </>
                            );
                          case "boolean":
                            return (
                              <>
                                <BooleanTypeFormField name={`json.${index}.booleanDummyType`} />
                                <Space w={28} />
                              </>
                            );
                          case "array":
                          case "object":
                            return (
                              <ActionIcon mb={1} component="button" onClick={onToggle}>
                                {isVisible ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                              </ActionIcon>
                            );
                        }
                      }}
                    </FormTypeWatcher>

                    <Tooltip label={deleteTooltipLabel} position="top-start">
                      <ActionIcon mb={1} component="button" onClick={() => onRemove(index)}>
                        <IconX size={16} color="red" />
                      </ActionIcon>
                    </Tooltip>
                  </Group>

                  {isVisible ? (
                    <FormTypeWatcher name={`${name}.${index}.valueType`} control={control}>
                      {(value) => {
                        switch (value) {
                          case "string":
                            return (
                              <StringOptionFormField
                                name={{
                                  stringDummyType: `${name}.${index}.stringDummyType`,
                                  options: `${name}.${index}.stringOptions`,
                                }}
                              />
                            );
                          case "number":
                            return (
                              <NumberOptionFormField
                                name={{
                                  numberDummyType: `${name}.${index}.numberDummyType`,
                                  options: `${name}.${index}.numberOptions`,
                                }}
                              />
                            );
                          case "array":
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
          </OptionVisibleWatcher>
        );
      })}

      <Button size="xs" mt="xs" type="button" color="red" variant="outline" onClick={onAppend}>
        {addKeyLabel}
      </Button>
    </Stack>
  );
};
