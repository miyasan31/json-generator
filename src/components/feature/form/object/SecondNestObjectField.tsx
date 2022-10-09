import { Group, Stack } from "@mantine/core";
import type { FC } from "react";
import type { Control, UseFormRegister } from "react-hook-form";

import { AddKeyButton } from "~/components/feature/form/button/AddKeyButton";
import { DeleteButton } from "~/components/feature/form/button/DeleteButton";
import { OptionToggleButton } from "~/components/feature/form/button/OptionToggleButton";
import { FormTypeField } from "~/components/feature/form/field/FormTypeField";
import { KeyNameField } from "~/components/feature/form/field/KeyNameField";
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

type SecondNestObjectFieldProps = {
  name: `json.${number}.item.object` | `json.${number}.object.${number}.object`;
  control: Control<ICreateJson>;
  register: UseFormRegister<ICreateJson>;
};

export const SecondNestObjectField: FC<SecondNestObjectFieldProps> = ({ name, control, register }) => {
  const { classes } = useObjectFieldStyle({ isBorder: true });
  const { fields, onAppend, onRemove } = useObjectField(name, control);

  return (
    <Stack spacing="xs" className={classes.root}>
      {fields.map((item, index) => {
        return (
          <OptionController key={item.id} type={item.valueType}>
            {(isVisible, onToggle) => (
              <>
                <Stack spacing="xs">
                  <Group spacing="xs" align="flex-start">
                    <KeyNameField register={register} name={`${name}.${index}.keyName`} />

                    <FormTypeField
                      data={objectValueTypeOption.slice(0, 3)}
                      control={control}
                      name={`${name}.${index}`}
                    />

                    <FormTypeWatcher control={control} name={`${name}.${index}.valueType`}>
                      {(value) => {
                        if (value === "string") {
                          return <StringTypeField control={control} name={`${name}.${index}.stringDummyType`} />;
                        }

                        if (value === "number") {
                          return <NumberTypeField control={control} name={`${name}.${index}.numberDummyType`} />;
                        }

                        if (value === "boolean") {
                          return <BooleanTypeField control={control} name={`${name}.${index}.booleanDummyType`} />;
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
                            <StringOptionField
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
                            <NumberOptionField
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
