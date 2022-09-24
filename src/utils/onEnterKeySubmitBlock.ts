import type { KeyboardEvent } from "react";

export const onEnterKeySubmitBlock = (e: KeyboardEvent): void => {
  if (e.code === "Enter") e.preventDefault();
};
