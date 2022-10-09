import { createStyles, Divider as MantineDivider } from "@mantine/core";

export const Divider = () => {
  const { classes } = useStyle();

  return <MantineDivider mt="xs" className={classes.root} />;
};

const useStyle = createStyles<"root">((theme) => {
  return {
    root: {
      border: `0.5px solid ${theme.colorScheme === "light" ? theme.colors.gray[3] : theme.colors.dark[5]}`,
    },
  };
});
