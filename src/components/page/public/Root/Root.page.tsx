import { Group } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useCallback, useState } from "react";
import { FormProvider } from "react-hook-form";

import { JsonGenerateModel } from "~/components/feature/modal/JsonGenerateModel";
import { InputLayout } from "~/components/layout/JsonEditorLayout/InputLayout";
import { OutputLayout } from "~/components/layout/JsonEditorLayout/OutputLayout";
import { defaultValues } from "~/constants/form/defaultValue";
import { createJsonNotification } from "~/constants/toast/createJson";
import type { ICreateJson } from "~/interfaces/useCase/json";
import { useMediaQuery } from "~/libs/mantine/useMediaQuery";
import { useRHForm } from "~/libs/react-hook-form/useRHForm";
import { supabaseService } from "~/services/supabase.service";
import { onEnterKeySubmitBlock } from "~/utils/onEnterKeySubmitBlock";

const { useCreateJson } = supabaseService;

export const Root = () => {
  const isMediumScreen = useMediaQuery("md");
  const { mutate } = useCreateJson();
  const [json, setJson] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const methods = useRHForm<ICreateJson>({
    mode: "onBlur",
    defaultValues,
  });
  const { handleSubmit: onSubmit } = methods;

  const onCreateJson = useCallback((data: ICreateJson) => {
    showNotification(createJsonNotification["loading"]);

    mutate(data, {
      onSuccess(res) {
        setJson(res);
        onModalToggle();
        updateNotification(createJsonNotification["success"]);
      },
      onError() {
        updateNotification(createJsonNotification["error"]);
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
            {isMediumScreen ? <OutputLayout /> : null}
          </Group>
        </form>
      </FormProvider>
    </>
  );
};
