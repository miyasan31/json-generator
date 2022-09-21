import { Box, Text } from "@mantine/core";

export const Header = () => {
  return (
    <Box
      component="header"
      sx={(theme) => ({
        padding: theme.spacing.sm,
        backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6],
      })}
    >
      <Text
        component="h1"
        sx={{
          margin: 0,
          fontSize: "1.25rem",
          textAlign: "center",
        }}
      >
        JSON Generator
      </Text>
    </Box>
  );
};
