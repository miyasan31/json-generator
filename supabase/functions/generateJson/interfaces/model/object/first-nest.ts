import { BooleanValue, NumberValue, StringValue } from "../primitive.ts";
import { SecondNestArrayItemType, SecondNestObjectPropertyType } from "./second-nest.ts";

interface FirstNestArrayValue {
  keyName: string;
  valueType: "array";
  length: number;
  item: SecondNestArrayItemType;
}

interface FirstNestObjectValue {
  keyName: null;
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
