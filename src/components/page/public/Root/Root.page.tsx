import { Group } from "@mantine/core";
import { useCallback, useState } from "react";
import { FormProvider } from "react-hook-form";

import { JsonGenerateModel } from "~/components/feature/modal/JsonGenerateModel";
import { InputLayout } from "~/components/layout/JsonEditor/InputLayout";
import { OutputLayout } from "~/components/layout/JsonEditor/OutputLayout";
import { useRHForm } from "~/components/lib/react-hook-form/useRHForm";
import { defaultValues } from "~/constants/form/defaultValue";
import type { JsonCreateForm } from "~/interfaces/model/form";
import { supabaseService } from "~/services/supabase.service";
import { onEnterKeySubmitBlock } from "~/utils/onEnterKeySubmitBlock";

const { useCreateJson } = supabaseService;

export const Root = () => {
  const [json, setJson] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useCreateJson();
  const methods = useRHForm<JsonCreateForm>({
    mode: "onBlur",
    defaultValues,
  });
  const { handleSubmit: onSubmit } = methods;

  const onCreateJson = useCallback((data: JsonCreateForm) => {
    mutate(data, {
      onSuccess(data) {
        setJson(JSON.stringify(data.data, null, 2));
        onModalToggle();
      },
      onError(error) {
        console.error(error.error);
      },
      onSettled() {
        console.info("settled");
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
