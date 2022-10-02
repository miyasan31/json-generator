import type { FC, ReactNode } from "react";
import type { Control } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { ICreateJson } from "~/interfaces/useCase/json";
import { jsonGenerator } from "~/utils/jsonGenerator";

type JsonGeneratorWatcherProps = {
  control: Control<ICreateJson>;
  children: (json: string) => ReactNode;
};

export const JsonGeneratorWatcher: FC<JsonGeneratorWatcherProps> = ({ control, children }) => {
  const value = useWatch({ name: "json", control });
  const object = jsonGenerator(value, 0);
  const json = JSON.stringify(object, null, 2);
  return <>{children(json)}</>;
};
