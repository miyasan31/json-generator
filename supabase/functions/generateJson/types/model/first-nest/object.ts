import { BooleanValue, NumberValue, StringValue } from "../primitive.ts";
import { SecondNestArrayItemType, SecondNestObjectPropertyType } from "./second-nest/object.ts";

interface FirstNestArrayValue {
  keyName: string;
  valueType: "array";
  options: {
    length: number;
    item: SecondNestArrayItemType;
  };
}

interface FirstNestObjectValue {
  keyName: string;
  valueType: "object";
  options: {
    object: SecondNestObjectPropertyType[];
  };
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
