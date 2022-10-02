import type { JsonValue } from "~/interfaces/useCase/json";
import type { ArrayValue } from "~/utils/arrayGenerator";
import { arrayGenerator } from "~/utils/arrayGenerator";
import { booleanGenerator } from "~/utils/booleanGenerator";
import { numberGenerator } from "~/utils/numberGenerator";
import { stringGenerator } from "~/utils/stringGenerator";

type ObjectValueType = string | number | boolean | ArrayValue;
export type ObjectValue = Record<string, ObjectValueType>;

export const jsonGenerator = (object: JsonValue[], index: number): ObjectValue => {
  return object.reduce((json, property) => {
    switch (property.valueType) {
      case "string":
        return {
          ...json,
          [property.keyName || "key"]: stringGenerator(property.stringDummyType, property.stringOptions, index),
        };
      case "number":
        return {
          ...json,
          [property.keyName || "key"]: numberGenerator(property.numberDummyType, property.numberOptions, index),
        };
      case "boolean":
        return { ...json, [property.keyName || "key"]: booleanGenerator(property.booleanDummyType) };
      case "object":
        return {
          ...json,
          [property.keyName || "key"]: property.object ? jsonGenerator(property.object, index) : {},
        };
      case "array":
        return { ...json, [property.keyName || "key"]: arrayGenerator(property.length, property.item) };
    }
  }, {});
};
