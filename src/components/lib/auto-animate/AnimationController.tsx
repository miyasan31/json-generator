import autoAnimate from "@formkit/auto-animate";
import type { FC, MutableRefObject, ReactNode } from "react";
import React, { useEffect, useRef } from "react";

import { ANIMATION_CONFIG } from "~/constants/animation/autoAnimate";

type AnimationControllerProps = {
  enable?: boolean;
  children: (ref: MutableRefObject<null>) => ReactNode;
};

export const AnimationController: FC<AnimationControllerProps> = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current && autoAnimate(ref.current, { ...ANIMATION_CONFIG.options });
  }, [ref]);

  return <>{children(ref)}</>;
};
