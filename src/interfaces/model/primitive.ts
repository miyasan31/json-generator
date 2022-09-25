/** string */
export type StringDummyType = "name" | "email" | "password" | "dateTime" | "date" | "time" | "image";

export interface StringValue {
  keyName: string;
  valueType: "string";
  options: {
    prefix: string;
    suffix: string;
    stringDummyType: StringDummyType;
  };
}

export interface StringDummyTypeOption {
  value: StringDummyType;
  label: string;
}

/** number */
export type NumberDummyType = "autoincrement" | "age" | "height" | "weight" | "price" | "random";

export interface NumberDummyTypeOption {
  value: NumberDummyType;
  label: string;
}

export interface NumberValue {
  keyName: string;
  valueType: "number";
  options: {
    numberDummyType: NumberDummyType;
  };
}

/** boolean */
export type BooleanDummyType = "true" | "false" | "random";

export interface BooleanValue {
  keyName: string;
  valueType: "boolean";
  options: {
    booleanDummyType: BooleanDummyType;
  };
}

export interface BooleanDummyTypeOption {
  value: BooleanDummyType;
  label: string;
}
