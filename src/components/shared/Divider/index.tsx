import { Divider as MantineDivider } from "@mantine/core";

export const Divider = () => {
  return (
    <MantineDivider
      mt="xs"
      sx={(theme) => ({
        border: `0.5px solid ${theme.colorScheme === "light" ? theme.colors.gray[3] : theme.colors.dark[5]}`,
      })}
    />
  );
};
