import { createStyles, ScrollArea } from "@mantine/core";

import { JsonGeneratorForm } from "~/components/feature/form";

export const InputLayout = () => {
  const { classes } = useStyle();

  return (
    <ScrollArea className={classes.root}>
      <JsonGeneratorForm />
    </ScrollArea>
  );
};

const useStyle = createStyles<"root">((theme) => {
  return {
    root: {
      flex: 3,
      height: "100%",
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[7],
      border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[4] : theme.colors.dark[4]}`,
    },
  };
});
