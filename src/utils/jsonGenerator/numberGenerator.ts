import { MAX_NUMBER, MIN_NUMBER } from "~/constants/form/numberRange";
import type { NumberDummyType } from "~/interfaces/model/primitive/number";

export const numberGenerator = (
  dummyType: NumberDummyType,
  options: { min?: number; max?: number; numberAnyValue?: number } | null,
  index: number,
): number => {
  if (dummyType === "random") {
    const min = options?.min ?? MIN_NUMBER;
    const max = options?.max ?? MAX_NUMBER;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  if (dummyType === "any") {
    const numberAnyValue = options?.numberAnyValue ?? 0;
    return numberAnyValue;
  }

  switch (dummyType) {
    case "autoIncrement":
      return index;
    case "age":
      return Math.floor(Math.random() * 100);
    case "height":
      return Math.floor(Math.random() * 100) + 100;
    case "weight":
      return Math.floor(Math.random() * 100) + 30;
    default:
      return 0;
  }

  // case "amount":
  //   return Math.floor(Math.random() * 100);
  // case "volume":
  //   return Math.floor(Math.random() * 100);
  // case "priority":
  //   return Math.floor(Math.random() * 100);
  // case "permission":
  //   return Math.floor(Math.random() * 100);
};
