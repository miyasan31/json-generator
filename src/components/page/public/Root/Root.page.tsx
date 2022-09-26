import { Group } from "@mantine/core";
import React, { useCallback } from "react";
import { FormProvider } from "react-hook-form";

import { InputLayout } from "~/components/layout/JsonEditor/InputLayout";
import { OutputLayout } from "~/components/layout/JsonEditor/OutputLayout";
import { useRHForm } from "~/components/lib/react-hook-form/useRHForm";
import { defaultValues } from "~/constants/form/defaultValue";
import type { JsonCreateForm } from "~/interfaces/model/form";
import { supabaseService } from "~/services/supabase.service";
import { onEnterKeySubmitBlock } from "~/utils/onEnterKeySubmitBlock";

const { useCreateJson } = supabaseService;

export const Root = () => {
  const { mutate } = useCreateJson();
  const methods = useRHForm<JsonCreateForm>({
    mode: "onBlur",
    defaultValues,
  });
  const { handleSubmit: onSubmit } = methods;

  const onCreateJson = useCallback((data: JsonCreateForm) => {
    console.info(data);
    mutate(data, {
      onSuccess(data) {
        console.info(data);
      },
      onError(error) {
        console.error(error);
      },
    });
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit(onCreateJson)} onKeyDown={onEnterKeySubmitBlock}>
        <Group spacing="sm" align="start" sx={{ height: "calc(100vh - 100px)" }}>
          <InputLayout />
          <OutputLayout />
        </Group>
      </form>
    </FormProvider>
  );
};
