import type { AutoAnimateOptions, AutoAnimationPlugin } from "@formkit/auto-animate";

type ConfigKey = "default" | "responsive";
type AnimationConfig = Partial<AutoAnimateOptions> | AutoAnimationPlugin;

export const ANIMATION_CONFIG: Record<ConfigKey, AnimationConfig> = {
  default: {
    duration: 200,
  },
  responsive: {
    duration: 400,
  },
};
