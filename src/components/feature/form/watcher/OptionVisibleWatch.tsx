import type { FC, ReactNode } from "react";
import { useCallback } from "react";
import { useState } from "react";

type ArrayTypeWatchProps = {
  children: (isVisible: boolean, onToggle: () => void) => ReactNode;
};

export const OptionVisibleWatch: FC<ArrayTypeWatchProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const onToggle = useCallback(() => setIsVisible((prev) => !prev), []);
  return <>{children(isVisible, onToggle)}</>;
};
