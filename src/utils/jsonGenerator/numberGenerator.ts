import { faker } from "@faker-js/faker";

import type { NumberDummyType } from "~/interfaces/model/primitive/number";

export const numberGenerator = (
  dummyType: NumberDummyType,
  options: { min?: number; max?: number; numberAnyValue?: number } | null,
  index: number,
): number => {
  if (["random", "price"].includes(dummyType)) {
    const min = options?.min ?? 0;
    const max = options?.max ?? 10000;

    switch (dummyType) {
      case "random":
        return Math.floor(Math.random() * (max - min)) - min;
      case "price":
        return Number(faker.commerce.price(min, max, 0));
    }
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
