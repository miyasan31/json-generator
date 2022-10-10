import { Group, Stack } from "@mantine/core";
import type { FC } from "react";

import { AddKeyButton } from "~/components/feature/form/button/AddKeyButton";
import { DeleteButton } from "~/components/feature/form/button/DeleteButton";
import { OptionToggleButton } from "~/components/feature/form/button/OptionToggleButton";
import { SecondNestArrayField } from "~/components/feature/form/field/SecondNestArrayField";
import { BooleanTypeField } from "~/components/feature/form/field/shared/boolean/BooleanTypeField";
import { NumberOptionField } from "~/components/feature/form/field/shared/number/NumberOptionField";
import { NumberTypeField } from "~/components/feature/form/field/shared/number/NumberTypeField";
import { KeyNameField } from "~/components/feature/form/field/shared/object/KeyNameField";
import { StringOptionField } from "~/components/feature/form/field/shared/string/StringOptionField";
import { StringTypeField } from "~/components/feature/form/field/shared/string/StringTypeField";
import { ValueTypeField } from "~/components/feature/form/field/shared/ValueTypeField";
import { useObjectField } from "~/components/feature/form/useObjectField";
import { useObjectFieldStyle } from "~/components/feature/form/useObjectFieldStyle";
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

                    <ValueTypeField data={objectValueTypeOption.slice(0, 4)} name={`${name}.${index}`} />

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
                            <SecondNestArrayField
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
