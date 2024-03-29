import { FirstNestArrayItemType, FirstNestObjectPropertyType } from "./first-nest.ts";

export type ArrayValueType = "string" | "number" | "boolean" | "object";
export type ObjectValueType = "string" | "number" | "boolean" | "object" | "array";

/** array */
export interface ArrayValue {
  keyName: string;
  valueType: "array";
  length: number;
  item: FirstNestArrayItemType;
}

export interface ArrayValueTypeOption {
  value: ArrayValueType;
  label: string;
}

/** object */
export interface ObjectValue {
  keyName: null;
  valueType: "object";
  object: FirstNestObjectPropertyType[];
}

export interface ObjectValueTypeOption {
  value: ObjectValueType;
  label: string;
}
