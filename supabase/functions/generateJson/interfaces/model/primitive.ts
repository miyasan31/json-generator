/** string */
export type StringDummyType =
  | "autoIncrement"
  | "fullName"
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "dateTime"
  // | "date"
  // | "time"
  | "image"
  | "dataUli"
  | "uuid"
  // | "cuid"
  | "ulid"
  // | "local"
  | "country"
  // | "city"
  // | "address"
  | "zipCode"
  // | "prefecture"
  // | "profile"
  // | "article"
  // | "tweet"
  // | "pokemon"
  | "ipAddress"
  | "domain"
  | "phone"
  // | "role"
  // | "tech"
  | "any";

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
export type NumberDummyType =
  | "autoIncrement"
  | "random"
  | "age"
  | "height"
  | "weight"
  | "price"
  // | "amount"
  // | "volume"
  // | "priority"
  // | "permission"
  | "any";

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
