import { Group, Stack, TextInput } from "@mantine/core";
import type { FC } from "react";
import { useCallback } from "react";
import type { Control, UseFormRegister } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import { AddKeyButton } from "~/components/feature/form/AddKeyButton";
import { DeleteButton } from "~/components/feature/form/DeleteButton";
import { BooleanTypeFormField } from "~/components/feature/form/field/BooleanTypeFormField";
import { FormTypeFormField } from "~/components/feature/form/field/FormTypeFormField";
import { NumberOptionFormField } from "~/components/feature/form/field/NumberOptionFormField";
import { NumberTypeFormField } from "~/components/feature/form/field/NumberTypeFormField";
import { StringOptionFormField } from "~/components/feature/form/field/StringOptionFormField";
import { StringTypeFormField } from "~/components/feature/form/field/StringTypeFormField";
import { OptionController } from "~/components/feature/form/OptionController";
import { OptionToggleButton } from "~/components/feature/form/OptionToggleButton";
import { FormTypeWatcher } from "~/components/feature/form/watcher/FormTypeWatcher";
import { Divider } from "~/components/shared/Divider";
import { formRules } from "~/constants/form/formRules";
import { keyNameLabel } from "~/constants/form/label";
import { objectValueTypeOption } from "~/constants/form/selectOption";
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

                    <FormTypeFormField
                      data={objectValueTypeOption.slice(0, 3)}
                      control={control}
                      name={`${name}.${index}`}
                    />

                    <FormTypeWatcher control={control} name={`${name}.${index}.valueType`}>
                      {(value) => {
                        if (value === "string") {
                          return <StringTypeFormField control={control} name={`${name}.${index}.stringDummyType`} />;
                        }

                        if (value === "number") {
                          return <NumberTypeFormField control={control} name={`${name}.${index}.numberDummyType`} />;
                        }

                        if (value === "boolean") {
                          return <BooleanTypeFormField control={control} name={`${name}.${index}.booleanDummyType`} />;
                        }
                      }}
                    </FormTypeWatcher>

                    <OptionToggleButton
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
                    <FormTypeWatcher control={control} name={`${name}.${index}.valueType`}>
                      {(value) => {
                        if (value === "string") {
                          return (
                            <StringOptionFormField
                              control={control}
                              register={register}
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
                              control={control}
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
          </OptionController>
        );
      })}

      <AddKeyButton onAppend={onAppend} />
    </Stack>
  );
};
