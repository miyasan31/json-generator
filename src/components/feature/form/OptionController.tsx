import type { FC, ReactNode } from "react";
import { useCallback } from "react";
import { useState } from "react";

import type { ObjectValueType } from "~/interfaces/model/object";

type OptionControllerProps = {
  type: ObjectValueType;
  children: (isVisible: boolean, onToggle: () => void) => ReactNode;
};

export const OptionController: FC<OptionControllerProps> = ({ type, children }) => {
  const [isVisible, setIsVisible] = useState(["array", "object"].includes(type));
  const onToggle = useCallback(() => setIsVisible((prev) => !prev), []);
  return <>{children(isVisible, onToggle)}</>;
};
