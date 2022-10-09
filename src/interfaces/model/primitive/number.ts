type StrictExtract<T, V extends T> = Extract<T, V>;

export type NumberDummyType =
  | "autoIncrement"
  | "random"
  | "age"
  | "height"
  | "weight"
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
  numberDummyType: StrictExtract<NumberDummyType, "random">;
  numberOptions: {
    min: number;
    max: number;
  };
};

export type NumberValue = (NoNumberOption | AnyNumberOption | RangeNumberOption) & {
  keyName: string;
  valueType: "number";
};
