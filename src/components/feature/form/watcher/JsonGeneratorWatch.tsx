import type { FC, ReactNode } from "react";
import type { Control } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { JsonCreateForm } from "~/components/feature/form/From.interface";
import { jsonGenerator } from "~/utils/jsonGenerator";

type JsonGeneratorWatchProps = {
  control: Control<JsonCreateForm>;
  children: (json: string) => ReactNode;
};

export const JsonGeneratorWatch: FC<JsonGeneratorWatchProps> = ({ control, children }) => {
  const length = useWatch({ name: "length", control });
  const value = useWatch({ name: "object", control });
  const object =
    Number(length) > 1
      ? [...new Array(Number(length))].map((_, i) => jsonGenerator(value, i))
      : jsonGenerator(value, 0);
  const json = JSON.stringify(object, null, 2);
  return <>{children(json)}</>;
};
