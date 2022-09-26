import { Prism } from "@mantine/prism";
import type { FC } from "react";

import { Modal } from "~/components/shared/Modal";

type JsonGenerateModelProps = {
  json: string;
  isOpen: boolean;
  onClose: () => void;
};

export const JsonGenerateModel: FC<JsonGenerateModelProps> = ({ json, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title="JSON Generate">
      <Prism
        language="json"
        withLineNumbers
        styles={(theme) => ({
          root: {
            borderRadius: theme.radius.sm,
            backgroundColor: theme.colorScheme === "light" ? "white" : theme.colors.dark[6],
            border: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[4] : theme.colors.dark[4]}`,
          },
          scrollArea: {
            borderRadius: theme.radius.sm,
          },
          code: {
            margin: "16px 0",
            padding: 0,
          },
          line: {
            backgroundColor: theme.colorScheme === "light" ? "white" : theme.colors.dark[6],
          },
        })}
      >
        {json}
      </Prism>
    </Modal>
  );
};
