export type ValueType = "string" | "number" | "boolean" | "object" | "array";

export type StringDummyType = "name" | "email" | "password" | "dateTime" | "date" | "time" | "image";

interface StringValue {
  keyName: string;
  valueType: "string";
  options: {
    prefix: string;
    suffix: string;
    dummyType: StringDummyType;
  };
}

export type NumberDummyType = "autoincrement" | "age" | "height" | "weight" | "price" | "random";

interface NumberValue {
  keyName: string;
  valueType: "number";
  options: {
    dummyType: NumberDummyType;
  };
}

export type BooleanDummyType = "true" | "false" | "random";

interface BooleanValue {
  keyName: string;
  valueType: "boolean";
  options: {
    dummyType: BooleanDummyType;
  };
}

type ObjectPropertyType = StringValue | NumberValue | BooleanValue;

interface ObjectValue {
  keyName: string;
  valueType: "object";
  options: {
    object: ObjectPropertyType[];
  };
}

export type ArrayItemType = StringValue | NumberValue | BooleanValue | ObjectValue;

interface ArrayValue {
  keyName: string;
  valueType: "array";
  options: {
    length: number;
    item: ArrayItemType;
  };
}

export type JsonValue = StringValue | NumberValue | BooleanValue | ObjectValue | ArrayValue;

export interface JsonCreateForm {
  object: JsonValue[];
}
