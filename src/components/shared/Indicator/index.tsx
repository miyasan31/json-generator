import { Box, Loader } from "@mantine/core";
import type { FC } from "react";

type Props = {
  message?: string;
};

export const Indicator: FC<Props> = ({ message = "読み込み中..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        paddingTop: "2.5rem",
        width: "100%",
      }}
    >
      <Loader color="red" />
      <p>{message}</p>
    </Box>
  );
};
