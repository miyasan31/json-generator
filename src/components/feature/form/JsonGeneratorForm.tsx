import { Group, Stack } from "@mantine/core";
import type { FC } from "react";
import type { Control, UseFormRegister } from "react-hook-form";
import { useFormState } from "react-hook-form";

import { AddKeyButton } from "~/components/feature/form/AddKeyButton";
import { DeleteButton } from "~/components/feature/form/DeleteButton";
import { ArrayOptionFormField } from "~/components/feature/form/field/ArrayOptionFormField";
import { BooleanTypeFormField } from "~/components/feature/form/field/BooleanTypeFormField";
import { FormTypeFormField } from "~/components/feature/form/field/FormTypeFormField";
import { KeyNameFormField } from "~/components/feature/form/field/KeyNameFormField";
import { NumberOptionFormField } from "~/components/feature/form/field/NumberOptionFormField";
import { NumberTypeFormField } from "~/components/feature/form/field/NumberTypeFormField";
import { ObjectFormField } from "~/components/feature/form/field/ObjectFormField";
import { StringOptionFormField } from "~/components/feature/form/field/StringOptionFormField";
import { StringTypeFormField } from "~/components/feature/form/field/StringTypeFormField";
import { OptionController } from "~/components/feature/form/OptionController";
import { OptionToggleButton } from "~/components/feature/form/OptionToggleButton";
import { useFormFieldStyle } from "~/components/feature/form/useFormFieldStyle";
import { useObjectFormField } from "~/components/feature/form/useObjectFormField";
import { FormTypeWatcher } from "~/components/feature/form/watcher/FormTypeWatcher";
import { Divider } from "~/components/shared/Divider";
import { objectValueTypeOption } from "~/constants/form/selectOption";
import type { ICreateJson } from "~/interfaces/useCase/json";

type JsonGeneratorFormProps = {
  control: Control<ICreateJson>;
  register: UseFormRegister<ICreateJson>;
};

export const JsonGeneratorForm: FC<JsonGeneratorFormProps> = ({ control, register }) => {
  const { classes } = useFormFieldStyle({ isBorder: false });
  const { fields, onAppend, onRemove } = useObjectFormField("json", control);

  const {
    errors: { json },
  } = useFormState({ control });

  return (
    <Stack spacing="xs" className={classes.root}>
      {fields.map((item, index) => {
        return (
          <OptionController key={item.id} type={item.valueType}>
            {(isVisible, onToggle) => (
              <>
                <Stack spacing="xs">
                  <Group spacing="xs" align="flex-start">
                    <KeyNameFormField
                      register={register}
                      name={`json.${index}.keyName`}
                      error={json && json[index]?.keyName?.message}
                    />

                    <FormTypeFormField data={objectValueTypeOption} control={control} name={`json.${index}`} />

                    <FormTypeWatcher control={control} name={`json.${index}.valueType`}>
                      {(value) => {
                        if (value === "string") {
                          return <StringTypeFormField control={control} name={`json.${index}.stringDummyType`} />;
                        }
                        if (value === "number") {
                          return <NumberTypeFormField control={control} name={`json.${index}.numberDummyType`} />;
                        }
                        if (value === "boolean") {
                          return <BooleanTypeFormField control={control} name={`json.${index}.booleanDummyType`} />;
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
                    <FormTypeWatcher control={control} name={`json.${index}.valueType`}>
                      {(value) => {
                        if (value === "string") {
                          return (
                            <StringOptionFormField
                              control={control}
                              register={register}
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
                              control={control}
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
                              control={control}
                              register={register}
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
