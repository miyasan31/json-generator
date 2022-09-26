import type { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import { useForm as useReactHookFrom } from "react-hook-form";

const useRHForm = <FormType extends FieldValues>(
  props: UseFormProps<FormType> & {
    defaultValues: FormType;
  },
): UseFormReturn<FormType> => {
  return useReactHookFrom(props);
};

export { useRHForm };
