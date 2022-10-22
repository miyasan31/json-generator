import { createStyles, Group } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useCallback, useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";

import { JsonGenerateModal } from "~/components/feature/modal/JsonGenerateModal";
import { JsonInputModal } from "~/components/feature/modal/JsonInputModal";
import { useModal } from "~/components/feature/modal/useModal";
import { InputLayout } from "~/components/layout/JsonEditorLayout/InputLayout";
import { OutputLayout } from "~/components/layout/JsonEditorLayout/OutputLayout";
import { AnimationController } from "~/components/lib/auto-animate/AnimationController";
import { ANIMATION_CONFIG } from "~/constants/animation/autoAnimate";
import { DEFAULT_VALUES } from "~/constants/form/defaultValues";
import { CREATE_JSON_NOTIFICATION } from "~/constants/notification/createJson";
import type { ICreateJson } from "~/interfaces/useCase/json";
import { useRHForm } from "~/libs/react-hook-form/useRHForm";
import { supabaseService } from "~/services/supabase.service";
import { onEnterKeySubmitBlock } from "~/utils/onEnterKeySubmitBlock";

const { useCreateJson } = supabaseService;

export const useCreateJsonFormContext = useFormContext<ICreateJson>;

export const Root = () => {
  const { classes } = useStyle();
  const { openKey, onClose, onJsonGenerateOpen } = useModal();
  // const isMediumScreen = useMediaQuery("md");
  const { mutate, isLoading } = useCreateJson();
  const [json, setJson] = useState("");

  const methods = useRHForm<ICreateJson>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
  });
  const { handleSubmit: onSubmit, reset } = methods;

  const onCreateJson = useCallback((data: ICreateJson) => {
    showNotification(CREATE_JSON_NOTIFICATION["loading"]);

    mutate(data, {
      onSuccess(res) {
        setJson(res);
        onJsonGenerateOpen();
        updateNotification(CREATE_JSON_NOTIFICATION["success"]);
      },
      onError() {
        updateNotification(CREATE_JSON_NOTIFICATION["error"]);
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
          <AnimationController options={ANIMATION_CONFIG.responsive}>
            {(fieldAnimationRef) => (
              <Group ref={fieldAnimationRef} spacing="sm" align="start" className={classes.layout}>
                <InputLayout />
                <OutputLayout isLoading={isLoading} />
                {/* {isMediumScreen ? <OutputLayout isLoading={isLoading} /> : null} */}
              </Group>
            )}
          </AnimationController>
        </form>
      </FormProvider>
    </>
  );
};

const useStyle = createStyles<"layout">(() => {
  return {
    layout: {
      // height: "calc(100vh - 140px)",
      position: "relative",
    },
  };
});
