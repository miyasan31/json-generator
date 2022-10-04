import type { RegisterOptions } from "react-hook-form";

export const formRules: Record<string, RegisterOptions> = {
  keyName: {
    required: {
      value: true,
      message: "必須入力項目です",
    },
  },
};
