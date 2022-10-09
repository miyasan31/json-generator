import { Group, Stack } from "@mantine/core";
import type { FC } from "react";
import type { Control, UseFormRegister } from "react-hook-form";

import { AddKeyButton } from "~/components/feature/form/AddKeyButton";
import { DeleteButton } from "~/components/feature/form/DeleteButton";
import { BooleanTypeFormField } from "~/components/feature/form/field/BooleanTypeFormField";
import { FirstNestArrayOptionFormField } from "~/components/feature/form/field/FirstNestArrayOptionFormField";
import { FormTypeFormField } from "~/components/feature/form/field/FormTypeFormField";
import { KeyNameFormField } from "~/components/feature/form/field/KeyNameFormField";
import { NumberOptionFormField } from "~/components/feature/form/field/NumberOptionFormField";
import { NumberTypeFormField } from "~/components/feature/form/field/NumberTypeFormField";
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

type Props = {
  name: `json.${number}.object`;
  control: Control<ICreateJson>;
  register: UseFormRegister<ICreateJson>;
};

export const ObjectFormField: FC<Props> = ({ name, control, register }) => {
  const { classes } = useFormFieldStyle({ isBorder: true });
  const { fields, onAppend, onRemove } = useObjectFormField(name, control);

  return (
    <Stack spacing="xs" className={classes.root}>
      {fields.map((item, index) => {
        return (
          <OptionController key={item.id} type={item.valueType}>
            {(isVisible, onToggle) => (
              <>
                <Stack spacing="xs">
                  <Group spacing="xs" align="flex-start">
                    <KeyNameFormField register={register} name={`${name}.${index}.keyName`} />

                    <FormTypeFormField
                      data={objectValueTypeOption.slice(0, 4)}
                      control={control}
                      name={`${name}.${index}`}
                    />

                    <FormTypeWatcher control={control} name={`${name}.${index}.valueType`}>
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

                        if (value === "array") {
                          return (
                            <FirstNestArrayOptionFormField
                              control={control}
                              register={register}
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
          </OptionController>
        );
      })}

      <AddKeyButton onAppend={onAppend} />
    </Stack>
  );
};
