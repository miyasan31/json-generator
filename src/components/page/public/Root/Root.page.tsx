import { Button, createStyles, Group, Select, Stack } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useCallback, useState } from "react";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { JsonGenerateModal } from "~/components/feature/modal/JsonGenerateModal";
import { JsonInputModal } from "~/components/feature/modal/JsonInputModal";
import { useModal } from "~/components/feature/modal/useModal";
import { InputLayout } from "~/components/layout/JsonEditorLayout/InputLayout";
import { OutputLayout } from "~/components/layout/JsonEditorLayout/OutputLayout";
import { defaultValues } from "~/constants/form/defaultValue";
import { jsonLengthOption } from "~/constants/form/selectOption";
import { createJsonNotification } from "~/constants/notification/createJson";
import type { ICreateJson } from "~/interfaces/useCase/json";
import { useMediaQuery } from "~/libs/mantine/useMediaQuery";
import { useRHForm } from "~/libs/react-hook-form/useRHForm";
import { supabaseService } from "~/services/supabase.service";
import { onEnterKeySubmitBlock } from "~/utils/onEnterKeySubmitBlock";

const { useCreateJson } = supabaseService;

export const useCreateJsonFormContext = useFormContext<ICreateJson>;

export const Root = () => {
  const {
    classes: { layout: classesLayout, ...classesSelect },
  } = useStyle();
  const { openKey, onClose, onJsonGenerateOpen, onJsonInputOpen } = useModal();
  const isMediumScreen = useMediaQuery("md");
  const { mutate, isLoading } = useCreateJson();
  const [json, setJson] = useState("");

  const methods = useRHForm<ICreateJson>({
    mode: "onBlur",
    defaultValues,
  });
  const {
    handleSubmit: onSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

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
                  JSONを入力
                </Button>
                {/* <Button type="button">保存する</Button> */}
              </Group>

              <Group spacing="sm">
                <Controller
                  control={control}
                  name="length"
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        label="生成数"
                        value={String(value)}
                        onChange={onChange}
                        data={jsonLengthOption}
                        classNames={classesSelect}
                      />
                    );
                  }}
                />
                <Button type="submit" loading={isLoading} disabled={!!errors.json} loaderProps={{ color: "yellow" }}>
                  生成する
                </Button>
              </Group>
            </Group>

            <Group spacing="sm" align="start" className={classesLayout}>
              <InputLayout />
              {isMediumScreen ? <OutputLayout /> : null}
            </Group>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
};

const useStyle = createStyles<"layout" | "root" | "label" | "input">(() => {
  return {
    layout: {
      height: "calc(100vh - 140px)",
    },
    // select
    root: {
      display: "flex",
      alignItems: "center",
      width: "fit-content",
      gap: "0.5rem",
    },
    label: {
      flex: "auto",
      minWidth: "fit-content",
    },
    input: {
      flex: "auto",
      width: "100px",
    },
  };
});
