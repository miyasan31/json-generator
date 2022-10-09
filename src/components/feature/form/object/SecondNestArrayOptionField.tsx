import { Group, Stack } from "@mantine/core";
import type { FC } from "react";
import type { Control, FieldPath, UseFormRegister } from "react-hook-form";

import { OptionToggleButton } from "~/components/feature/form/button/OptionToggleButton";
import { FormTypeField } from "~/components/feature/form/field/FormTypeField";
import { ArrayLengthField } from "~/components/feature/form/object/ArrayLengthField";
import { useObjectFieldStyle } from "~/components/feature/form/object/useObjectFieldStyle";
import { BooleanTypeField } from "~/components/feature/form/primitive/BooleanTypeField";
import { NumberOptionField } from "~/components/feature/form/primitive/NumberOptionField";
import { NumberTypeField } from "~/components/feature/form/primitive/NumberTypeField";
import { StringOptionField } from "~/components/feature/form/primitive/StringOptionField";
import { StringTypeField } from "~/components/feature/form/primitive/StringTypeField";
import { ArrayTypeWatcher } from "~/components/feature/form/watcher/ArrayTypeWatcher";
import { FormTypeWatcher } from "~/components/feature/form/watcher/FormTypeWatcher";
import { OptionController } from "~/components/feature/form/watcher/OptionController";
import { arrayValueTypeOption } from "~/constants/form/selectOption";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type SecondNestArrayOptionFieldProps = {
  control: Control<ICreateJson>;
  register: UseFormRegister<ICreateJson>;
  name: {
    length: FilterFieldPath<FieldPath<ICreateJson>, "length">;
    item: `json.${number}.object.${number}.item`;
  };
};

export const SecondNestArrayOptionField: FC<SecondNestArrayOptionFieldProps> = ({ control, register, name }) => {
  const { classes } = useObjectFieldStyle({ isBorder: true });

  return (
    <OptionController type="array">
      {(isVisible, onToggle) => (
        <Stack spacing="xs" className={classes.root}>
          <Group spacing="xs" align="flex-start">
            <ArrayLengthField control={control} name={`${name.length}`} />

            <FormTypeField data={arrayValueTypeOption.slice(0, 3)} control={control} name={`${name.item}`} />

            <FormTypeWatcher control={control} name={`${name.item}.valueType`}>
              {(value) => {
                if (value === "string") {
                  return <StringTypeField control={control} name={`${name.item}.stringDummyType`} />;
                }

                if (value === "number") {
                  return <NumberTypeField control={control} name={`${name.item}.numberDummyType`} />;
                }

                if (value === "boolean") {
                  return <BooleanTypeField control={control} name={`${name.item}.booleanDummyType`} />;
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
                    <StringOptionField
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
                    <NumberOptionField
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
