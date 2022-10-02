type StrictExtract<T, V extends T> = Extract<T, V>;

/** -------- string -------- */
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
  // | "ulid"
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

export type NoStringOption = {
  stringDummyType: StrictExtract<
    StringDummyType,
    "password" | "dateTime" | "image" | "dataUli" | "uuid" | "country" | "zipCode" | "ipAddress" | "domain" | "phone"
  >;
  stringOptions: null;
};

export type AnyStringOption = {
  stringDummyType: StrictExtract<StringDummyType, "any">;
  stringOptions: {
    stringAnyValue: string;
  };
};

export type CustomStringOption = {
  stringDummyType: StrictExtract<StringDummyType, "autoIncrement" | "fullName" | "firstName" | "lastName" | "email">;
  stringOptions: {
    prefix: string;
    suffix: string;
  };
};

export type StringValue = (NoStringOption | AnyStringOption | CustomStringOption) & {
  keyName: string;
  valueType: "string";
};

export type StringDummyTypeOption = {
  value: StringDummyType;
  label: string;
};

/** -------- number -------- */
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

export type NumberDummyTypeOption = {
  value: NumberDummyType;
  label: string;
};

export type NoNumberOption = {
  numberDummyType: StrictExtract<NumberDummyType, "autoIncrement" | "age" | "height" | "weight">;
  numberOptions: null;
};

export type AnyNumberOption = {
  numberDummyType: StrictExtract<NumberDummyType, "any">;
  numberOptions: {
    numberAnyValue: number;
  };
};

export type RangeNumberOption = {
  numberDummyType: StrictExtract<NumberDummyType, "random" | "price">;
  numberOptions: {
    min: number;
    max: number;
  };
};

export type NumberValue = (NoNumberOption | AnyNumberOption | RangeNumberOption) & {
  keyName: string;
  valueType: "number";
};

/** -------- boolean -------- */
export type BooleanDummyType = "true" | "false" | "random";

export type BooleanValue = {
  keyName: string;
  valueType: "boolean";
  booleanDummyType: BooleanDummyType;
};

export type BooleanDummyTypeOption = {
  value: BooleanDummyType;
  label: string;
};
