import { ActionIcon, Group, NumberInput, Select, Stack } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

import { BooleanTypeFormField } from "~/components/feature/form/field/BooleanTypeFormField";
import { NumberOptionFormField } from "~/components/feature/form/field/NumberOptionFormField";
import { NumberTypeFormField } from "~/components/feature/form/field/NumberTypeFormField";
import { StringOptionFormField } from "~/components/feature/form/field/StringOptionFormField";
import { StringTypeFormField } from "~/components/feature/form/field/StringTypeFormField";
import { ArrayTypeWatcher } from "~/components/feature/form/watcher/ArrayTypeWatcher";
import { FormTypeWatcher } from "~/components/feature/form/watcher/FormTypeWatcher";
import { OptionVisibleWatcher } from "~/components/feature/form/watcher/OptionVisibleWatcher";
import { appendValue } from "~/constants/form/appendValue";
import { generateLengthLabel, valueTypeLabel } from "~/constants/form/label";
import { arrayValueTypeOption } from "~/constants/form/selectOption";
import type { ObjectValueType } from "~/interfaces/model/object";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type FirstNestArrayOptionFormFieldProps = {
  name: {
    length: FilterFieldPath<FieldPath<ICreateJson>, "length">;
    item: `json.${number}.object.${number}.item`;
  };
};

export const FirstNestArrayOptionFormField: FC<FirstNestArrayOptionFormFieldProps> = ({ name }) => {
  const { control } = useFormContext<ICreateJson>();

  return (
    <OptionVisibleWatcher type="array">
      {(isVisible, onToggle) => (
        <Stack
          spacing="xs"
          sx={(theme) => ({
            borderRadius: theme.radius.sm,
            padding: theme.spacing.lg,
            marginTop: theme.spacing.xs,
            backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[7],
            border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[3] : theme.colors.dark[5]}`,
          })}
        >
          <Group spacing="xs" align="end">
            <Controller
              control={control}
              name={`${name.length}`}
              render={({ field: { onChange, value } }) => {
                return (
                  <NumberInput
                    defaultValue={5}
                    min={1}
                    max={100}
                    size="xs"
                    label={generateLengthLabel}
                    value={value}
                    onChange={onChange}
                    sx={{
                      flex: 1,
                    }}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name={`${name.item}`}
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
                    data={arrayValueTypeOption}
                    sx={{
                      flex: 1,
                    }}
                  />
                );
              }}
            />

            <FormTypeWatcher name={`${name.item}.valueType`} control={control}>
              {(value) => {
                switch (value) {
                  case "string":
                    return <StringTypeFormField name={`${name.item}.stringDummyType`} />;
                  case "number":
                    return <NumberTypeFormField name={`${name.item}.numberDummyType`} />;
                  case "boolean":
                    return <BooleanTypeFormField name={`${name.item}.booleanDummyType`} />;
                }
              }}
            </FormTypeWatcher>

            <ActionIcon mb={1} component="button" onClick={onToggle}>
              {isVisible ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
            </ActionIcon>
          </Group>

          {isVisible ? (
            <ArrayTypeWatcher name={`${name.item}.valueType`} control={control}>
              {(value) => {
                switch (value) {
                  case "string":
                    return (
                      <StringOptionFormField
                        name={{
                          stringDummyType: `${name.item}.stringDummyType`,
                          options: `${name.item}.stringOptions`,
                        }}
                      />
                    );
                  case "number":
                    return (
                      <NumberOptionFormField
                        name={{
                          numberDummyType: `${name.item}.numberDummyType`,
                          options: `${name.item}.numberOptions`,
                        }}
                      />
                    );
                }
              }}
            </ArrayTypeWatcher>
          ) : null}
        </Stack>
      )}
    </OptionVisibleWatcher>
  );
};
