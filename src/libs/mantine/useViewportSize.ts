import { useViewportSize as useViewportSizeOriginal } from "@mantine/hooks";
import { useEffect, useState } from "react";

export const useViewportSize = () => {
  const [isMounted, setIsMounted] = useState(false);
  const viewportSize = useViewportSizeOriginal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? viewportSize : { width: undefined, height: undefined };
};
