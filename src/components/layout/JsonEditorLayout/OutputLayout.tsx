import { Button, createStyles, Group, Select, Stack } from "@mantine/core";
import { Prism } from "@mantine/prism";
import type { FC } from "react";
import { useMemo } from "react";
import { Controller, useWatch } from "react-hook-form";

import { useCreateJsonFormContext } from "~/components/page/public/Root/Root.page";
import { JSON_SPACE_WIDTH } from "~/constants/form/jsonSpaceWidth";
import { JSON_LENGTH_OPTIONS } from "~/constants/form/selectOption";
import { jsonGenerator } from "~/utils/jsonGenerator";

export const OutputLayout: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const { classes } = useStyle();
  const { classes: prismClasses } = usePrismStyle();
  const { classes: selectClasses } = useSelectStyle();
  const {
    control,
    formState: { errors },
  } = useCreateJsonFormContext();
  const value = useWatch({ name: "json", control });

  const object = useMemo(() => {
    return jsonGenerator(value, 0);
  }, [JSON.stringify(value)]);

  const json = JSON.stringify(object, null, JSON_SPACE_WIDTH);

  return (
    <Stack spacing="sm" className={classes.layout}>
      <Group spacing="sm" position="right">
        <Controller
          control={control}
          name="length"
          render={({ field: { onChange, value } }) => {
            return (
              <Select
                label="生成数"
                value={String(value)}
                onChange={onChange}
                data={JSON_LENGTH_OPTIONS}
                classNames={selectClasses}
              />
            );
          }}
        />
        <Button
          type="submit"
          loading={isLoading}
          disabled={!!errors.json || !value.length}
          loaderProps={{ color: "yellow" }}
        >
          生成する
        </Button>
      </Group>

      <Prism language="json" noCopy withLineNumbers classNames={prismClasses}>
        {json}
      </Prism>
    </Stack>
  );
};

const useStyle = createStyles<"layout">(() => {
  return {
    // select
    layout: {
      position: "sticky",
      top: 68,
      flex: 2,
      height: "calc(100vh - 88px)",
    },
  };
});

const useSelectStyle = createStyles<"root" | "label" | "input">(() => {
  return {
    // select
    root: {
      display: "flex",
      alignItems: "center",
      width: "fit-content",
      gap: "0.5rem",
    },
    label: {
      flex: "auto",
      minWidth: "fit-content",
    },
    input: {
      flex: "auto",
      width: "100px",
    },
  };
});

const usePrismStyle = createStyles<"root" | "scrollArea" | "code" | "line" | "lineContent">((theme) => {
  return {
    //  prism
    root: {
      height: "100%",
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colorScheme === "light" ? "white" : theme.colors.dark[7],
      border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[4] : theme.colors.dark[4]}`,
      minHeight: 0,
    },
    scrollArea: {
      borderRadius: theme.radius.sm,
      height: "100%",
    },
    code: {
      margin: "8px 32px 8px 0",
      padding: 0,
    },
    line: {
      height: "100%",
      width: "100%",
      backgroundColor: theme.colorScheme === "light" ? "white" : theme.colors.dark[7],
    },
    lineContent: {
      maxWidth: "100px",
    },
  };
});
