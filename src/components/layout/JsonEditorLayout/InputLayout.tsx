import { Box, createStyles } from "@mantine/core";

import { JsonGeneratorForm } from "~/components/feature/form";

export const InputLayout = () => {
  const { classes } = useStyle();

  return (
    <Box className={classes.root}>
      <JsonGeneratorForm />
    </Box>
  );
};

const useStyle = createStyles<"root">((theme) => {
  return {
    root: {
      flex: 3,
      minHeight: "calc(100vh - 136px)",
      marginTop: 48,
      marginBottom: 20,
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[7],
      border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[4] : theme.colors.dark[4]}`,
    },
  };
});
