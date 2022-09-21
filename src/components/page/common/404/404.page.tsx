import { Button, Stack, Text } from "@mantine/core";

import { Link } from "~/components/lib/react-router/Link";

export const NotFound = () => {
  return (
    <Stack spacing="lg" align="center" justify="center" sx={{ minHeight: "100vh", width: "100%" }}>
      <Text component="h1" sx={{ margin: 0, textAlign: "center", fontSize: "2.5rem" }}>
        404 NotFound
      </Text>

      <Link to="/">
        <Button size="md">ホームへ</Button>
      </Link>
    </Stack>
  );
};
