import type { SecondNestArrayItemType, SecondNestObjectPropertyType } from "~/interfaces/model/object/second-nest";
import type { BooleanValue, NumberValue, StringValue } from "~/interfaces/model/primitive";

interface FirstNestArrayValue {
  keyName: string;
  valueType: "array";
  length: number;
  item: SecondNestArrayItemType;
}

interface FirstNestObjectValue {
  keyName: string;
  valueType: "object";
  object: SecondNestObjectPropertyType[];
}

/** array */
export type FirstNestArrayItemType = StringValue | NumberValue | BooleanValue | FirstNestObjectValue;

/** object */
export type FirstNestObjectPropertyType =
  | StringValue
  | NumberValue
  | BooleanValue
  | FirstNestArrayValue
  | FirstNestObjectValue;
