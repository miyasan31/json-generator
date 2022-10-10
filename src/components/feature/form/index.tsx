import { Group, Stack } from "@mantine/core";

import { AddKeyButton } from "~/components/feature/form/button/AddKeyButton";
import { DeleteButton } from "~/components/feature/form/button/DeleteButton";
import { OptionToggleButton } from "~/components/feature/form/button/OptionToggleButton";
import { FirstNestArrayField } from "~/components/feature/form/field/FirstNestArrayField";
import { FirstNestObjectField } from "~/components/feature/form/field/FirstNestObjectField";
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
import { OBJECT_VALUE_TYPE_OPTIONS } from "~/constants/form/selectOption";

export const JsonGeneratorForm = () => {
  const { classes } = useObjectFieldStyle({ isBorder: false });
  const { fields, onAppend, onRemove } = useObjectField("json");

  return (
    <Stack spacing="xs" className={classes.root}>
      {fields.map((item, index) => {
        return (
          <OptionController key={item.id} type={item.valueType}>
            {(isVisible, onToggle) => (
              <>
                <Stack spacing="xs">
                  <Group spacing="xs" align="flex-start">
                    <KeyNameField name={`json.${index}.keyName`} />

                    <ValueTypeField data={OBJECT_VALUE_TYPE_OPTIONS} name={`json.${index}`} />

                    <FormTypeWatcher name={`json.${index}.valueType`}>
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
                        valueType: `json.${index}.valueType`,
                        stringDummyType: `json.${index}.stringDummyType`,
                        numberDummyType: `json.${index}.numberDummyType`,
                      }}
                    />

                    <DeleteButton index={index} onRemove={onRemove} />
                  </Group>

                  {isVisible ? (
                    <FormTypeWatcher name={`json.${index}.valueType`}>
                      {(value) => {
                        if (value === "string") {
                          return (
                            <StringOptionField
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
                              name={{
                                numberDummyType: `json.${index}.numberDummyType`,
                                options: `json.${index}.numberOptions`,
                              }}
                            />
                          );
                        }

                        if (value === "array") {
                          return (
                            <FirstNestArrayField
                              name={{
                                length: `json.${index}.length`,
                                item: `json.${index}.item`,
                              }}
                            />
                          );
                        }

                        if (value === "object") {
                          return <FirstNestObjectField name={`json.${index}.object`} />;
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
