import type { RegisterOptions } from "react-hook-form";

export const formRules: Record<string, RegisterOptions> = {
  keyName: {
    required: {
      value: true,
      message: "必須入力項目です",
    },
    pattern: {
      value: /^[0-9a-zA-Z]*$/,
      message: "半角英数字で入力してください",
    },
  },
  min: {
    min: {
      value: 10,
      message: "エラー",
    },
  },
};
