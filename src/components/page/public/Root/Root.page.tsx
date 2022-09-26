import { Group } from "@mantine/core";
import { useCallback, useState } from "react";
import { FormProvider } from "react-hook-form";

import { JsonGenerateModel } from "~/components/feature/modal/JsonGenerateModel";
import { InputLayout } from "~/components/layout/JsonEditorLayout/InputLayout";
import { OutputLayout } from "~/components/layout/JsonEditorLayout/OutputLayout";
import { defaultValues } from "~/constants/form/defaultValue";
import type { ICreateJson } from "~/interfaces/useCase/json";
import { useRHForm } from "~/libs/react-hook-form/useRHForm";
import { supabaseService } from "~/services/supabase.service";
import { onEnterKeySubmitBlock } from "~/utils/onEnterKeySubmitBlock";

const { useCreateJson } = supabaseService;

export const Root = () => {
  const { mutate } = useCreateJson();

  const [json, setJson] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const methods = useRHForm<ICreateJson>({
    mode: "onBlur",
    defaultValues,
  });

  const { handleSubmit: onSubmit } = methods;

  const onCreateJson = useCallback((data: ICreateJson) => {
    mutate(data, {
      onSuccess(res) {
        setJson(JSON.stringify(res || {}, null, 2));
        onModalToggle();
      },
    });
  }, []);

  const onModalToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <JsonGenerateModel json={json} isOpen={isOpen} onClose={onModalToggle} />
      <FormProvider {...methods}>
        <form onSubmit={onSubmit(onCreateJson)} onKeyDown={onEnterKeySubmitBlock}>
          <Group spacing="sm" align="start" sx={{ height: "calc(100vh - 100px)" }}>
            <InputLayout />
            <OutputLayout />
          </Group>
        </form>
      </FormProvider>
    </>
  );
};
