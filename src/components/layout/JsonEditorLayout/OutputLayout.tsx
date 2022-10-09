import { createStyles } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { useFormContext } from "react-hook-form";

import { JsonGeneratorWatcher } from "~/components/feature/form/watcher/JsonGeneratorWatcher";
import type { ICreateJson } from "~/interfaces/useCase/json";

export const OutputLayout = () => {
  const { classes } = useStyle();
  const { control } = useFormContext<ICreateJson>();

  return (
    <JsonGeneratorWatcher control={control}>
      {(json: string) => (
        <Prism language="json" noCopy withLineNumbers classNames={classes}>
          {json}
        </Prism>
      )}
    </JsonGeneratorWatcher>
  );
};

const useStyle = createStyles<"root" | "scrollArea" | "code" | "line" | "lineContent">((theme) => {
  return {
    root: {
      flex: 2,
      width: "100%",
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
