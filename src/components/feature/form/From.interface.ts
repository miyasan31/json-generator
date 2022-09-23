export type ValueType = "string" | "number" | "boolean" | "object" | "array";

type StringDummyType = "name" | "email" | "password" | "dateTime" | "date" | "time" | "image";

export interface StringValue {
  keyName: string;
  valueType: "string";
  options: {
    prefix: string;
    suffix: string;
    dummyType: StringDummyType;
  };
}

type NumberDummyType = "autoincrement" | "age" | "height" | "weight" | "price" | "random";

export interface NumberValue {
  keyName: string;
  valueType: "number";
  options: {
    dummyType: NumberDummyType;
  };
}

type BooleanDummyType = "true" | "false" | "random";

export interface BooleanValue {
  keyName: string;
  valueType: "boolean";
  options: {
    dummyType: BooleanDummyType;
  };
}

export type ObjectPropertyType = StringValue | NumberValue | BooleanValue;

export interface ObjectValue {
  keyName: string;
  valueType: "object";
  options: {
    object: ObjectPropertyType[];
  };
}

type ArrayItemType = StringValue | NumberValue | BooleanValue | ObjectValue;

export interface ArrayValue {
  keyName: string;
  valueType: "array";
  options: {
    length: number;
    item: ArrayItemType;
  };
}

export type FormValue = StringValue | NumberValue | BooleanValue | ObjectValue | ArrayValue;

export interface JsonCreateForm {
  object: FormValue[];
}
