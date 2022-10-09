import type { BooleanDummyType } from "~/interfaces/model/primitive/boolean";

export const booleanGenerator = (booleanDummyType: BooleanDummyType): boolean => {
  switch (booleanDummyType) {
    case "true":
      return true;
    case "false":
      return false;
    case "random":
      return Math.random() > 0.5;
    default:
      return false;
  }
};
