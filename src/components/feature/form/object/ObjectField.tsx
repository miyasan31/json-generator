import { Group, Stack } from "@mantine/core";
import type { FC } from "react";
import type { Control, UseFormRegister } from "react-hook-form";
import { useFormState } from "react-hook-form";

import { AddKeyButton } from "~/components/feature/form/button/AddKeyButton";
import { DeleteButton } from "~/components/feature/form/button/DeleteButton";
import { OptionToggleButton } from "~/components/feature/form/button/OptionToggleButton";
import { FormTypeField } from "~/components/feature/form/field/FormTypeField";
import { KeyNameField } from "~/components/feature/form/field/KeyNameField";
import { FirstNestArrayOptionField } from "~/components/feature/form/object/FirstNestArrayOptionField";
import { FirstNestObjectField } from "~/components/feature/form/object/FirstNestObjectField";
import { useObjectField } from "~/components/feature/form/object/useObjectField";
import { useObjectFieldStyle } from "~/components/feature/form/object/useObjectFieldStyle";
import { BooleanTypeField } from "~/components/feature/form/primitive/BooleanTypeField";
import { NumberOptionField } from "~/components/feature/form/primitive/NumberOptionField";
import { NumberTypeField } from "~/components/feature/form/primitive/NumberTypeField";
import { StringOptionField } from "~/components/feature/form/primitive/StringOptionField";
import { StringTypeField } from "~/components/feature/form/primitive/StringTypeField";
import { FormTypeWatcher } from "~/components/feature/form/watcher/FormTypeWatcher";
import { OptionController } from "~/components/feature/form/watcher/OptionController";
import { Divider } from "~/components/shared/Divider";
import { objectValueTypeOption } from "~/constants/form/selectOption";
import type { ICreateJson } from "~/interfaces/useCase/json";

type ObjectFieldProps = {
  control: Control<ICreateJson>;
  register: UseFormRegister<ICreateJson>;
};

export const ObjectField: FC<ObjectFieldProps> = ({ control, register }) => {
  const { classes } = useObjectFieldStyle({ isBorder: false });
  const { fields, onAppend, onRemove } = useObjectField("json", control);

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
                    <KeyNameField
                      register={register}
                      name={`json.${index}.keyName`}
                      error={json && json[index]?.keyName?.message}
                    />

                    <FormTypeField data={objectValueTypeOption} control={control} name={`json.${index}`} />

                    <FormTypeWatcher control={control} name={`json.${index}.valueType`}>
                      {(value) => {
                        if (value === "string") {
                          return <StringTypeField control={control} name={`json.${index}.stringDummyType`} />;
                        }
                        if (value === "number") {
                          return <NumberTypeField control={control} name={`json.${index}.numberDummyType`} />;
                        }
                        if (value === "boolean") {
                          return <BooleanTypeField control={control} name={`json.${index}.booleanDummyType`} />;
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
                            <StringOptionField
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
                            <NumberOptionField
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
                            <FirstNestArrayOptionField
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
                            <FirstNestObjectField register={register} control={control} name={`json.${index}.object`} />
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
