import type { FirstNestArrayItemType } from "~/interfaces/model/object/first-nest";
import type { SecondNestArrayItemType } from "~/interfaces/model/object/second-nest";
import type { ObjectValue } from "~/utils/jsonGenerator";
import { jsonGenerator } from "~/utils/jsonGenerator";
import { booleanGenerator } from "~/utils/jsonGenerator/booleanGenerator";
import { numberGenerator } from "~/utils/jsonGenerator/numberGenerator";
import { stringGenerator } from "~/utils/jsonGenerator/stringGenerator";

type ArrayItemType = FirstNestArrayItemType | SecondNestArrayItemType;
export type ArrayValue = string[] | number[] | boolean[] | ObjectValue[];

export const arrayGenerator = (length: number, item: ArrayItemType): ArrayValue => {
  switch (item.valueType) {
    case "string":
      return [...new Array(length)].map((_, index) => stringGenerator(item.stringDummyType, item.stringOptions, index));
    case "number":
      return [...new Array(length)].map((_, index) => numberGenerator(item.numberDummyType, item.numberOptions, index));
    case "boolean":
      return [...new Array(length)].map(() => booleanGenerator(item.booleanDummyType));
    case "object":
      return [...new Array(length)].map((_, index) => (item.object ? jsonGenerator(item.object, index) : {}));
  }
};
