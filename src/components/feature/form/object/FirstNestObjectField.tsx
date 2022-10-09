import { Group, Stack } from "@mantine/core";
import type { FC } from "react";

import { AddKeyButton } from "~/components/feature/form/button/AddKeyButton";
import { DeleteButton } from "~/components/feature/form/button/DeleteButton";
import { OptionToggleButton } from "~/components/feature/form/button/OptionToggleButton";
import { FormTypeField } from "~/components/feature/form/field/FormTypeField";
import { KeyNameField } from "~/components/feature/form/field/KeyNameField";
import { SecondNestArrayOptionField } from "~/components/feature/form/object/SecondNestArrayOptionField";
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

type FirstNestObjectFieldProps = {
  name: `json.${number}.object`;
};

export const FirstNestObjectField: FC<FirstNestObjectFieldProps> = ({ name }) => {
  const { classes } = useObjectFieldStyle({ isBorder: true });
  const { fields, onAppend, onRemove } = useObjectField(name);

  return (
    <Stack spacing="xs" className={classes.root}>
      {fields.map((item, index) => {
        return (
          <OptionController key={item.id} type={item.valueType}>
            {(isVisible, onToggle) => (
              <>
                <Stack spacing="xs">
                  <Group spacing="xs" align="flex-start">
                    <KeyNameField name={`${name}.${index}.keyName`} />

                    <FormTypeField data={objectValueTypeOption.slice(0, 4)} name={`${name}.${index}`} />

                    <FormTypeWatcher name={`${name}.${index}.valueType`}>
                      {(value) => {
                        if (value === "string") {
                          return <StringTypeField name={`json.${index}.stringDummyType`} />;
                        }

                        if (value === "number") {
                          return <NumberTypeField name={`json.${index}.numberDummyType`} />;
                        }

                        if (value === "boolean") {
                          return <BooleanTypeField name={`json.${index}.booleanDummyType`} />;
                        }
                      }}
                    </FormTypeWatcher>

                    <OptionToggleButton
                      isVisible={isVisible}
                      onToggle={onToggle}
                      name={{
                        valueType: `${name}.${index}.valueType`,
                        stringDummyType: `${name}.${index}.stringDummyType`,
                        numberDummyType: `${name}.${index}.numberDummyType`,
                      }}
                    />

                    <DeleteButton index={index} onRemove={onRemove} />
                  </Group>

                  {isVisible ? (
                    <FormTypeWatcher name={`${name}.${index}.valueType`}>
                      {(value) => {
                        if (value === "string") {
                          return (
                            <StringOptionField
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
                              name={{
                                numberDummyType: `${name}.${index}.numberDummyType`,
                                options: `${name}.${index}.numberOptions`,
                              }}
                            />
                          );
                        }

                        if (value === "array") {
                          return (
                            <SecondNestArrayOptionField
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
