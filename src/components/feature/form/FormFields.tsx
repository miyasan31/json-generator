import { ActionIcon, Button, Group, Select, Stack, TextInput, Tooltip } from "@mantine/core";
import { IconX } from "@tabler/icons";
import type { FC } from "react";
import React, { Fragment, useCallback } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import { ArrayFormField } from "~/components/feature/form/field/ArrayFormField";
import { BooleanFormField } from "~/components/feature/form/field/BooleanFormField";
import { NumberFormField } from "~/components/feature/form/field/NumberFormField";
import { ObjectFormField } from "~/components/feature/form/field/ObjectFormField";
import { StringFormField } from "~/components/feature/form/field/StringFormField";
import { FormTypeWatch } from "~/components/feature/form/watcher/FormTypeWatch";
import { Divider } from "~/components/shared/Divider";
import { appendValue } from "~/constants/form/appendValue";
import { objectValueTypeOption } from "~/constants/form/selectOption";
import type { JsonCreateForm, ValueType } from "~/interfaces/model/From.interface";

type Props = {
  control: any;
  register: any;
};

export const FormFields: FC<Props> = ({ control, register }) => {
  const {
    // formState: { errors },
  } = useFormContext<JsonCreateForm>();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "object",
  });

  const onRemove = useCallback((index: number) => remove(index), [remove]);
  const onAppend = useCallback(
    () =>
      append({
        keyName: "",
        valueType: "string",
        options: {
          dummyType: "name",
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
        padding: theme.spacing.md,
      })}
    >
      {fields.map((item, index) => {
        return (
          <Fragment key={item.id}>
            <Stack spacing="xs">
              <Group spacing="xs" align="end">
                <Tooltip label="delete" position="top-start">
                  <ActionIcon mb={1} component="button" onClick={() => onRemove(index)}>
                    <IconX size={16} color="red" />
                  </ActionIcon>
                </Tooltip>

                <TextInput size="xs" label="key" {...register(`object.${index}.keyName`, { required: true })} />

                <Controller
                  control={control}
                  name={`object.${index}`}
                  render={({ field: { onChange, value } }) => {
                    const onChangeValue = (value: ValueType) =>
                      onChange({ valueType: value, options: appendValue[value] });
                    return (
                      <Select
                        size="xs"
                        label="value"
                        value={value.valueType}
                        onChange={onChangeValue}
                        data={objectValueTypeOption}
                      />
                    );
                  }}
                />
              </Group>

              <FormTypeWatch name={`object.${index}.valueType`} control={control}>
                {(value) => {
                  if (value === "string") {
                    return <StringFormField name={`object.${index}`} />;
                  }
                  if (value === "number") {
                    return <NumberFormField name={`object.${index}`} />;
                  }
                  if (value === "boolean") {
                    return <BooleanFormField name={`object.${index}`} />;
                  }
                  if (value === "object") {
                    return (
                      <ObjectFormField register={register} control={control} name={`object.${index}.options.object`} />
                    );
                  }
                  if (value === "array") {
                    return <ArrayFormField name={`object.${index}`} />;
                  }
                }}
              </FormTypeWatch>
            </Stack>

            <Divider />
          </Fragment>
        );
      })}

      <Button size="xs" type="button" color="red" variant="outline" onClick={onAppend}>
        Add key
      </Button>
    </Stack>
  );
};
