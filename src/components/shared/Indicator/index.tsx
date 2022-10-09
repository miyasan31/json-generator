import { Box, createStyles, Loader } from "@mantine/core";
import type { FC } from "react";

type Props = {
  message?: string;
};

export const Indicator: FC<Props> = ({ message = "読み込み中..." }) => {
  const { classes } = useStyle();

  return (
    <Box className={classes.root}>
      <Loader color="red" />
      <p>{message}</p>
    </Box>
  );
};

const useStyle = createStyles<"root">(() => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      paddingTop: "2.5rem",
      width: "100%",
    },
  };
});
