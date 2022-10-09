import { Button, createStyles, Stack, Text } from "@mantine/core";

import { Link } from "~/components/lib/react-router/Link";

export const NotFound = () => {
  const { classes } = useStyle();

  return (
    <Stack spacing="lg" align="center" justify="center" className={classes.root}>
      <Text component="h1" className={classes.title}>
        404 NotFound
      </Text>

      <Link to="/">
        <Button size="md">ホームへ</Button>
      </Link>
    </Stack>
  );
};

const useStyle = createStyles<"root" | "title">(() => {
  return {
    root: {
      minHeight: "100vh",
      width: "100%",
    },
    title: {
      margin: 0,
      textAlign: "center",
      fontSize: "2.5rem",
    },
  };
});
