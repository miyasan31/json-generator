import type { AutoAnimateOptions, AutoAnimationPlugin } from "@formkit/auto-animate";
import autoAnimate from "@formkit/auto-animate";
import type { FC, MutableRefObject, ReactNode } from "react";
import { useEffect, useRef } from "react";

import { ANIMATION_CONFIG } from "~/constants/animation/autoAnimate";

type AnimationControllerProps = {
  children: (ref: MutableRefObject<null>) => ReactNode;
  options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin;
};

export const AnimationController: FC<AnimationControllerProps> = ({ children, options }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current &&
      autoAnimate(ref.current, {
        ...ANIMATION_CONFIG.default,
        ...options,
      });
  }, [ref, options]);

  return <>{children(ref)}</>;
};

/**
 * コンポーネントジェネリクスパターン
 *
 * 任意のrefの型に対応できる
 *
 *  */
// type AnimationControllerProps<T extends HTMLElement> = {
//   children: (ref: RefObject<T>) => ReactNode;
//   options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin;
// };

// export const AnimationController = <T extends HTMLElement>({ children, options }: AnimationControllerProps<T>) => {
//   const ref = useRef<T>(null);
//   useEffect(() => {
//     ref.current &&
//       autoAnimate(ref.current, {
//         ...ANIMATION_CONFIG.default,
//         ...options,
//       });
//   }, [ref, options]);
//   return <>{children(ref)}</>;
// };
