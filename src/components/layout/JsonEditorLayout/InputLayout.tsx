import { ScrollArea } from "@mantine/core";
import { useFormContext } from "react-hook-form";

import { JsonGeneratorForm } from "~/components/feature/form/JsonGeneratorForm";
import type { ICreateJson } from "~/interfaces/useCase/json";

export const InputLayout = () => {
  const { control, register } = useFormContext<ICreateJson>();

  return (
    <ScrollArea
      sx={(theme) => ({
        flex: 3,
        height: "100%",
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[7],
        border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[4] : theme.colors.dark[4]}`,
      })}
    >
      <JsonGeneratorForm border={false} {...{ control, register }} />
    </ScrollArea>
  );
};
