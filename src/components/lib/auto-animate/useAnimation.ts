import type { AutoAnimateOptions, AutoAnimationPlugin } from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { RefObject } from "react";

import { ANIMATION_CONFIG } from "~/constants/animation/autoAnimate";

type AnimationOptions = Partial<AutoAnimateOptions> | AutoAnimationPlugin;

type UseAnimation = <T extends HTMLElement>(options?: AnimationOptions) => [RefObject<T>, (enabled: boolean) => void];

export const useAnimation: UseAnimation = <T extends HTMLElement>(options?: AnimationOptions) => {
  return useAutoAnimate<T>({ ...ANIMATION_CONFIG.default, ...options });
};
