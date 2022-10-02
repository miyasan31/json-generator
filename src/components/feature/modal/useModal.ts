import { useCallback, useState } from "react";

type ModalKey = "input" | "generate" | null;

export const useModal = () => {
  const [openKey, setOpenKey] = useState<ModalKey>(null);

  const onJsonInputOpen = useCallback(() => {
    setOpenKey("input");
  }, []);

  const onJsonGenerateOpen = useCallback(() => {
    setOpenKey("generate");
  }, []);

  const onClose = useCallback(() => {
    setOpenKey(null);
  }, []);

  return {
    openKey,
    onJsonInputOpen,
    onJsonGenerateOpen,
    onClose,
  };
};
