import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { RefObject } from "react";

import { ANIMATION_CONFIG } from "~/constants/animation/autoAnimate";

type UseListAnimation = <T extends HTMLElement>() => [RefObject<T>, (enabled: boolean) => void];

export const useListAnimation: UseListAnimation = <T extends HTMLElement>() => {
  return useAutoAnimate<T>(ANIMATION_CONFIG.default);
};
