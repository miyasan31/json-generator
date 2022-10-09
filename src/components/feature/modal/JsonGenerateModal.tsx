import { createStyles } from "@mantine/core";
import { Prism } from "@mantine/prism";
import type { FC } from "react";

import { Modal } from "~/components/shared/Modal";

type JsonGenerateModalProps = {
  json: string;
  isOpen: boolean;
  onClose: () => void;
};

export const JsonGenerateModal: FC<JsonGenerateModalProps> = ({ json, isOpen, onClose }) => {
  const { classes } = useStyle();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isBorder size="lg" title="JSONを生成しました 🎉">
      <Prism language="json" copyLabel="コピー" copiedLabel="コピーしました！" withLineNumbers classNames={classes}>
        {json}
      </Prism>
    </Modal>
  );
};

const useStyle = createStyles<"root" | "code" | "copy" | "line">((theme) => {
  return {
    root: {
      backgroundColor: theme.colorScheme === "light" ? "white" : theme.colors.dark[7],
    },
    code: {
      margin: "8px 32px 8px 0",
      padding: 0,
    },
    copy: {
      width: "40px",
      height: "40px",
      backgroundColor: `${theme.colorScheme === "light" ? theme.colors.gray[2] : theme.colors.dark[6]} !important`,
      svg: {
        width: "20px",
        height: "20px",
      },
    },
    line: {
      backgroundColor: theme.colorScheme === "light" ? "white" : theme.colors.dark[7],
    },
  };
});
