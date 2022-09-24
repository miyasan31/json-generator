export type ValueType = "string" | "number" | "boolean" | "object" | "array";

export type ArrayValueType = "string" | "number" | "boolean" | "object";

export type StringDummyType = "name" | "email" | "password" | "dateTime" | "date" | "time" | "image";

export interface StringValue {
  keyName: string;
  valueType: "string";
  options: {
    prefix: string;
    suffix: string;
    dummyType: StringDummyType;
  };
}

export interface StringDummyTypeOption {
  value: StringDummyType;
  label: string;
}

export type NumberDummyType = "autoincrement" | "age" | "height" | "weight" | "price" | "random";

export interface NumberDummyTypeOption {
  value: NumberDummyType;
  label: string;
}

export interface NumberValue {
  keyName: string;
  valueType: "number";
  options: {
    dummyType: NumberDummyType;
  };
}

export type BooleanDummyType = "true" | "false" | "random";

export interface BooleanValue {
  keyName: string;
  valueType: "boolean";
  options: {
    dummyType: BooleanDummyType;
  };
}

export interface BooleanDummyTypeOption {
  value: BooleanDummyType;
  label: string;
}

type ObjectPropertyType = StringValue | NumberValue | BooleanValue | ObjectValue | ArrayValue;

export interface ObjectValue {
  keyName: string;
  valueType: "object";
  options: {
    object: ObjectPropertyType[];
  };
}

export interface ObjectValueTypeOption {
  value: ValueType;
  label: string;
}

export type ArrayItemType = StringValue | NumberValue | BooleanValue | ObjectValue;

export interface ArrayValue {
  keyName: string;
  valueType: "array";
  options: {
    length: number;
    item: ArrayItemType;
  };
}

export interface ArrayValueTypeOption {
  value: ArrayValueType;
  label: string;
}

export type JsonValue = StringValue | NumberValue | BooleanValue | ObjectValue | ArrayValue;

export interface JsonCreateForm {
  length: number;
  object: JsonValue[];
}
