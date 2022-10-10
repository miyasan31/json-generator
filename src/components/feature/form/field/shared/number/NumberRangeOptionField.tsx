import { createStyles, RangeSlider } from "@mantine/core";
import type { FC } from "react";
import { useCallback } from "react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";

import { useCreateJsonFormContext } from "~/components/page/public/Root/Root.page";
import { MAX_NUMBER, MIN_NUMBER, MIN_RANGE, RANGE_SLIDER_MARKS, RANGE_STEP } from "~/constants/form/numberRange";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type NumberRangeOptionFieldProps = {
  name: {
    options: FilterFieldPath<FieldPath<ICreateJson>, "numberOptions">;
  };
};

export const NumberRangeOptionField: FC<NumberRangeOptionFieldProps> = ({ name }) => {
  const { classes } = useStyle();
  const { control } = useCreateJsonFormContext();

  const minField = useController({
    name: `${name.options}.min`,
    control,
  });

  const maxField = useController({
    name: `${name.options}.max`,
    control,
  });

  const onChange = useCallback((value: [number, number]) => {
    minField.field.onChange(value[0]);
    maxField.field.onChange(value[1]);
  }, []);

  return (
    <RangeSlider
      my={16}
      mr={6}
      value={[minField.field.value ?? MIN_NUMBER, maxField.field.value ?? MAX_NUMBER]}
      onChange={onChange}
      minRange={MIN_RANGE}
      step={RANGE_STEP}
      min={MIN_NUMBER}
      max={MAX_NUMBER}
      marks={RANGE_SLIDER_MARKS}
      classNames={classes}
    />
  );
};

const useStyle = createStyles<"bar" | "thumb" | "mark">((theme) => {
  return {
    bar: {
      backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[6] : theme.colors.red[6],
    },
    thumb: {
      backgroundColor: "white",
      borderColor: theme.colorScheme === "light" ? theme.colors.gray[6] : theme.colors.red[6],
    },
    mark: {
      borderColor: theme.colorScheme === "light" ? theme.colors.gray[2] : theme.colors.dark[4],
    },
    markFilled: {
      borderColor: theme.colorScheme === "light" ? theme.colors.gray[6] : theme.colors.red[6],
    },
  };
});
