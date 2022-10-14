import type { SecondNestArrayItemType, SecondNestObjectPropertyType } from "~/interfaces/model/object/second-nest";
import type { BooleanValue } from "~/interfaces/model/primitive/boolean";
import type { NumberValue } from "~/interfaces/model/primitive/number";
import type { StringValue } from "~/interfaces/model/primitive/string";

type FirstNestArrayValue = {
  keyName: string;
  valueType: "array";
  length: number;
  item: SecondNestArrayItemType;
};

type FirstNestObjectValue = {
  keyName: null;
  valueType: "object";
  object: SecondNestObjectPropertyType[];
};

/** array */
export type FirstNestArrayItemType = StringValue | NumberValue | BooleanValue | FirstNestObjectValue;

/** object */
export type FirstNestObjectPropertyType =
  | StringValue
  | NumberValue
  | BooleanValue
  | FirstNestArrayValue
  | FirstNestObjectValue;
