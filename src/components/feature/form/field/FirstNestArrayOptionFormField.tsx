import { Group, Stack } from "@mantine/core";
import type { FC } from "react";
import type { Control, FieldPath, UseFormRegister } from "react-hook-form";

import { ArrayLengthFormField } from "~/components/feature/form/field/ArrayLengthFormField";
import { BooleanTypeFormField } from "~/components/feature/form/field/BooleanTypeFormField";
import { FormTypeFormField } from "~/components/feature/form/field/FormTypeFormField";
import { NumberOptionFormField } from "~/components/feature/form/field/NumberOptionFormField";
import { NumberTypeFormField } from "~/components/feature/form/field/NumberTypeFormField";
import { StringOptionFormField } from "~/components/feature/form/field/StringOptionFormField";
import { StringTypeFormField } from "~/components/feature/form/field/StringTypeFormField";
import { OptionController } from "~/components/feature/form/OptionController";
import { OptionToggleButton } from "~/components/feature/form/OptionToggleButton";
import { ArrayTypeWatcher } from "~/components/feature/form/watcher/ArrayTypeWatcher";
import { FormTypeWatcher } from "~/components/feature/form/watcher/FormTypeWatcher";
import { arrayValueTypeOption } from "~/constants/form/selectOption";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type FirstNestArrayOptionFormFieldProps = {
  control: Control<ICreateJson>;
  register: UseFormRegister<ICreateJson>;
  name: {
    length: FilterFieldPath<FieldPath<ICreateJson>, "length">;
    item: `json.${number}.object.${number}.item`;
  };
};

export const FirstNestArrayOptionFormField: FC<FirstNestArrayOptionFormFieldProps> = ({ control, register, name }) => {
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
            <ArrayLengthFormField control={control} name={`${name.length}`} />

            <FormTypeFormField data={arrayValueTypeOption.slice(0, 3)} control={control} name={`${name.item}`} />

            <FormTypeWatcher control={control} name={`${name.item}.valueType`}>
              {(value) => {
                if (value === "string") {
                  return <StringTypeFormField control={control} name={`${name.item}.stringDummyType`} />;
                }
                if (value === "number") {
                  return <NumberTypeFormField control={control} name={`${name.item}.numberDummyType`} />;
                }
                if (value === "boolean") {
                  return <BooleanTypeFormField control={control} name={`${name.item}.booleanDummyType`} />;
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
            <ArrayTypeWatcher control={control} name={`${name.item}.valueType`}>
              {(value) => {
                if (value === "string") {
                  return (
                    <StringOptionFormField
                      control={control}
                      register={register}
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
                      control={control}
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
    </OptionController>
  );
};
