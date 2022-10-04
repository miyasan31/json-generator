import { Button, Group, Select, Stack } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useCallback, useState } from "react";
import { Controller, FormProvider } from "react-hook-form";

import { JsonGenerateModal } from "~/components/feature/modal/JsonGenerateModal";
import { JsonInputModal } from "~/components/feature/modal/JsonInputModal";
import { useModal } from "~/components/feature/modal/useModal";
import { InputLayout } from "~/components/layout/JsonEditorLayout/InputLayout";
import { OutputLayout } from "~/components/layout/JsonEditorLayout/OutputLayout";
import { defaultValues } from "~/constants/form/defaultValue";
import {
  generateButtonLabel,
  generateLengthLabel,
  importButtonLabel,
  // saveButtonLabel
} from "~/constants/form/label";
import { jsonLengthOption } from "~/constants/form/selectOption";
import { createJsonNotification } from "~/constants/notification/createJson";
import type { ICreateJson } from "~/interfaces/useCase/json";
import { useMediaQuery } from "~/libs/mantine/useMediaQuery";
import { useRHForm } from "~/libs/react-hook-form/useRHForm";
import { supabaseService } from "~/services/supabase.service";
import { onEnterKeySubmitBlock } from "~/utils/onEnterKeySubmitBlock";

const { useCreateJson } = supabaseService;

export const Root = () => {
  const { openKey, onClose, onJsonGenerateOpen, onJsonInputOpen } = useModal();
  const isMediumScreen = useMediaQuery("md");
  const { mutate } = useCreateJson();
  const [json, setJson] = useState("");

  const methods = useRHForm<ICreateJson>({
    mode: "onBlur",
    defaultValues,
  });
  const { handleSubmit: onSubmit, control, reset } = methods;

  const onCreateJson = useCallback((data: ICreateJson) => {
    showNotification(createJsonNotification["loading"]);

    mutate(data, {
      onSuccess(res) {
        setJson(res);
        onJsonGenerateOpen();
        updateNotification(createJsonNotification["success"]);
      },
      onError() {
        updateNotification(createJsonNotification["error"]);
      },
    });
  }, []);

  const onImportJson = useCallback((json: ICreateJson) => {
    reset(json);
  }, []);

  return (
    <>
      <JsonInputModal isOpen={openKey === "input"} onClose={onClose} onChange={onImportJson} />
      <JsonGenerateModal json={json} isOpen={openKey === "generate"} onClose={onClose} />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit(onCreateJson)} onKeyDown={onEnterKeySubmitBlock}>
          <Stack spacing="sm">
            <Group spacing="sm" position="apart" align="end">
              <Group spacing="sm">
                <Button type="button" onClick={onJsonInputOpen}>
                  {importButtonLabel}
                </Button>
                {/* <Button type="button">{saveButtonLabel}</Button> */}
              </Group>

              <Group spacing="sm">
                <Controller
                  control={control}
                  name="length"
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        label={generateLengthLabel}
                        value={String(value)}
                        onChange={onChange}
                        data={jsonLengthOption}
                        styles={{
                          root: { display: "flex", alignItems: "center", width: "fit-content", gap: "0.5rem" },
                          label: { flex: "auto", minWidth: "fit-content" },
                          input: { flex: "auto", width: "100px" },
                        }}
                      />
                    );
                  }}
                />
                <Button type="submit">{generateButtonLabel}</Button>
              </Group>
            </Group>

            <Group spacing="sm" align="start" sx={{ height: "calc(100vh - 140px)" }}>
              <InputLayout />
              {isMediumScreen ? <OutputLayout /> : null}
            </Group>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
};
