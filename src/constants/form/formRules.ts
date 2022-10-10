import type { RegisterOptions } from "react-hook-form";

const RULES: Record<string, RegisterOptions> = {
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
  arrayLength: {
    required: {
      value: true,
      message: "必須入力項目です",
    },
    max: {
      value: 20,
      message: "エラー",
    },
  },
};

/** ReactHookForm fieldレベルルール */
export const FORM_RULES: Record<keyof typeof RULES, RegisterOptions> = RULES;
