/** string */
export type StringDummyType =
  | "autoIncrement"
  | "fullName"
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "dateTime"
  | "date"
  | "time"
  | "image"
  | "uuid"
  | "cuid"
  | "local"
  | "country"
  | "address"
  | "zipCode"
  | "prefecture"
  | "profile"
  | "article"
  | "tweet"
  | "pokemon"
  | "animal";

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
export type NumberDummyType = "autoIncrement" | "age" | "height" | "weight" | "price" | "zipCode" | "random";

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
