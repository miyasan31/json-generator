import type { FirstNestArrayItemType, FirstNestObjectPropertyType } from "~/interfaces/model/object/first-nest";

export type ArrayValueType = "string" | "number" | "boolean" | "object";
export type ObjectValueType = "string" | "number" | "boolean" | "object" | "array";

/** array */
export type ArrayValue = {
  keyName: string;
  valueType: "array";
  length: number;
  item: FirstNestArrayItemType;
};

export type ArrayValueTypeOption = {
  value: ArrayValueType;
  label: string;
};

/** object */
export type ObjectValue = {
  keyName: null;
  valueType: "object";
  object: FirstNestObjectPropertyType[];
};

export type ObjectValueTypeOption = {
  value: ObjectValueType;
  label: string;
};
