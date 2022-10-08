import { Group, Stack, TextInput } from "@mantine/core";
import type { FC } from "react";
import { useCallback } from "react";
import type { Control, UseFormRegister } from "react-hook-form";
import { useFormState } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import { AddKeyButton } from "~/components/feature/form/AddKeyButton";
import { DeleteButton } from "~/components/feature/form/DeleteButton";
import { ArrayOptionFormField } from "~/components/feature/form/field/ArrayOptionFormField";
import { BooleanTypeFormField } from "~/components/feature/form/field/BooleanTypeFormField";
import { FormTypeFormField } from "~/components/feature/form/field/FormTypeFormField";
import { NumberOptionFormField } from "~/components/feature/form/field/NumberOptionFormField";
import { NumberTypeFormField } from "~/components/feature/form/field/NumberTypeFormField";
import { ObjectFormField } from "~/components/feature/form/field/ObjectFormField";
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

type JsonGeneratorFormProps = {
  control: Control<ICreateJson>;
  register: UseFormRegister<ICreateJson>;
  border?: boolean;
};

export const JsonGeneratorForm: FC<JsonGeneratorFormProps> = ({ control, register, border = true }) => {
  const {
    errors: { json },
  } = useFormState({ control });
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
          <OptionController key={item.id} type={item.valueType}>
            {(isVisible, onToggle) => (
              <>
                <Stack spacing="xs">
                  <Group spacing="xs" align="flex-start">
                    <TextInput
                      required
                      size="xs"
                      label={keyNameLabel}
                      {...register(`json.${index}.keyName`, formRules.keyName)}
                      sx={{
                        flex: 2,
                      }}
                      error={json && json[index]?.keyName?.message}
                    />

                    <FormTypeFormField data={objectValueTypeOption} name={`json.${index}`} />

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

                    <OptionToggleButton
                      isVisible={isVisible}
                      onToggle={onToggle}
                      control={control}
                      name={{
                        valueType: `json.${index}.valueType`,
                        stringDummyType: `json.${index}.stringDummyType`,
                        numberDummyType: `json.${index}.numberDummyType`,
                      }}
                    />

                    <DeleteButton index={index} onRemove={onRemove} />
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
          </OptionController>
        );
      })}

      <AddKeyButton onAppend={onAppend} />
    </Stack>
  );
};
