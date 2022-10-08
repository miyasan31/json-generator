import { Group, Select, Stack } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

import { ArrayLengthFormField } from "~/components/feature/form/field/ArrayLengthFormField";
import { BooleanTypeFormField } from "~/components/feature/form/field/BooleanTypeFormField";
import { FirstNestObjectFormField } from "~/components/feature/form/field/FirstNestObjectFormField";
import { NumberOptionFormField } from "~/components/feature/form/field/NumberOptionFormField";
import { NumberTypeFormField } from "~/components/feature/form/field/NumberTypeFormField";
import { StringOptionFormField } from "~/components/feature/form/field/StringOptionFormField";
import { StringTypeFormField } from "~/components/feature/form/field/StringTypeFormField";
import { OptionController } from "~/components/feature/form/OptionController";
import { OptionToggleButton } from "~/components/feature/form/OptionToggleButton";
import { ArrayTypeWatcher } from "~/components/feature/form/watcher/ArrayTypeWatcher";
import { FormTypeWatcher } from "~/components/feature/form/watcher/FormTypeWatcher";
import { appendValue } from "~/constants/form/appendValue";
import { valueTypeLabel } from "~/constants/form/label";
import { arrayValueTypeOption } from "~/constants/form/selectOption";
import type { ObjectValueType } from "~/interfaces/model/object";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type ArrayOptionFormFieldProps = {
  name: {
    length: FilterFieldPath<FieldPath<ICreateJson>, "length">;
    item: `json.${number}.item`;
  };
};

export const ArrayOptionFormField: FC<ArrayOptionFormFieldProps> = ({ name }) => {
  const { control, register } = useFormContext<ICreateJson>();

  return (
    <OptionController type="array">
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
          <Group spacing="xs" align="flex-start">
            <ArrayLengthFormField name={`${name.length}`} />

            <Controller
              control={control}
              name={`${name.item}`}
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
                if (value === "string") {
                  return <StringTypeFormField name={`${name.item}.stringDummyType`} />;
                }
                if (value === "number") {
                  return <NumberTypeFormField name={`${name.item}.numberDummyType`} />;
                }
                if (value === "boolean") {
                  return <BooleanTypeFormField name={`${name.item}.booleanDummyType`} />;
                }
              }}
            </FormTypeWatcher>
            <OptionToggleButton
              isVisible={isVisible}
              onToggle={onToggle}
              name={{
                valueType: `${name.item}.valueType`,
                stringDummyType: `${name.item}.stringDummyType`,
                numberDummyType: `${name.item}.numberDummyType`,
              }}
              control={control}
            />
          </Group>

          {isVisible ? (
            <ArrayTypeWatcher name={`${name.item}.valueType`} control={control}>
              {(value) => {
                if (value === "string") {
                  return (
                    <StringOptionFormField
                      name={{
                        stringDummyType: `${name.item}.stringDummyType`,
                        options: `${name.item}.stringOptions`,
                      }}
                    />
                  );
                }

                if (value === "number") {
                  return (
                    <NumberOptionFormField
                      name={{
                        numberDummyType: `${name.item}.numberDummyType`,
                        options: `${name.item}.numberOptions`,
                      }}
                    />
                  );
                }

                if (value === "object") {
                  return (
                    <FirstNestObjectFormField register={register} control={control} name={`${name.item}.object`} />
                  );
                }
              }}
            </ArrayTypeWatcher>
          ) : null}
        </Stack>
      )}
    </OptionController>
  );
};
