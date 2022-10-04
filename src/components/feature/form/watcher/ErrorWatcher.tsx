import type { Control, FieldPath } from "react-hook-form";
import { useFormState } from "react-hook-form";

import type { ICreateJson } from "~/interfaces/useCase/json";

type ErrorWatcherProps = {
  control: Control<ICreateJson>;
  name: FieldPath<ICreateJson>;
};

export const ErrorWatcher = ({ control, name }: ErrorWatcherProps) => {
  const { errors } = useFormState({ control, name });

  if (Object.keys(errors).length === 0) {
    return null;
  }

  return errors;
};
