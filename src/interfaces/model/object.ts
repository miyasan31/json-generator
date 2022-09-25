import type { FirstNestArrayItemType, FirstNestObjectPropertyType } from "~/interfaces/model/first-nest/object";

export type ValueType = "string" | "number" | "boolean" | "object" | "array";
export type ArrayValueType = "string" | "number" | "boolean" | "object";

/** array */
export interface ArrayValue {
  keyName: string;
  valueType: "array";
  options: {
    length: number;
    item: FirstNestArrayItemType;
  };
}

export interface ArrayValueTypeOption {
  value: ArrayValueType;
  label: string;
}

/** object */
export interface ObjectValue {
  keyName: string;
  valueType: "object";
  options: {
    object: FirstNestObjectPropertyType[];
  };
}

export interface ObjectValueTypeOption {
  value: ValueType;
  label: string;
}
