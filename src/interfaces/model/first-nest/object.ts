import type {
  SecondNestArrayItemType,
  SecondNestObjectPropertyType,
} from "~/interfaces/model/first-nest/second-nest/object";
import type { BooleanValue, NumberValue, StringValue } from "~/interfaces/model/primitive";

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
    nest: SecondNestObjectPropertyType[];
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
