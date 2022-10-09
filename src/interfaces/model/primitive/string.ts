type StrictExtract<T, V extends T> = Extract<T, V>;

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
