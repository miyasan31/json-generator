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
