import { Box, createStyles, Text } from "@mantine/core";

export const Header = () => {
  const { classes } = useStyle();

  return (
    <Box component="header" className={classes.root}>
      <Text component="h1" className={classes.title}>
        JSON Generator
      </Text>
    </Box>
  );
};

const useStyle = createStyles<"root" | "title">((theme) => {
  return {
    root: {
      position: "fixed",
      zIndex: 100,
      width: "100%",
      height: "56px",
      padding: theme.spacing.sm,
      backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6],
      borderBottom: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[3] : theme.colors.dark[4]}`,
    },
    title: {
      margin: 0,
      fontSize: "1.25rem",
      textAlign: "center",
    },
  };
});
